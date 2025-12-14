// biome-ignore lint/correctness/noUnusedVariables: Called in other files
function loadInsight(config, translation) {
  const main = document.querySelector(".searchbox");
  if (!main) return; // 安全检查

  const input = main.querySelector(".searchbox-input");
  const container = main.querySelector(".searchbox-body");

  // Helper: Create element with class and text
  function createElement(tag, className, text) {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function section(title) {
    const sectionEl = createElement("section", "searchbox-result-section");
    const header = createElement("header", "", title);
    sectionEl.appendChild(header);
    return sectionEl;
  }

  function merge(ranges) {
    let last;
    const result = [];
    ranges.forEach((r) => {
      if (!last || r[0] > last[1]) {
        result.push((last = r));
      } else if (r[1] > last[1]) {
        last[1] = r[1];
      }
    });
    return result;
  }

  function findAndHighlight(text, matches, maxlen) {
    if (!Array.isArray(matches) || !matches.length || !text) {
      return maxlen ? text.slice(0, maxlen) : text;
    }
    const testText = text.toLowerCase();
    const indices = matches
      .map((match) => {
        const index = testText.indexOf(match.toLowerCase());
        if (!match || index === -1) {
          return null;
        }
        return [index, index + match.length];
      })
      .filter((match) => match !== null)
      .sort((a, b) => a[0] - b[0] || a[1] - b[1]);

    if (!indices.length) {
      return text;
    }

    let result = "";
    let last = 0;
    const ranges = merge(indices);
    const sumRange = [ranges[0][0], ranges[ranges.length - 1][1]];

    if (maxlen && maxlen < sumRange[1]) {
      last = sumRange[0];
    }

    for (let i = 0; i < ranges.length; i++) {
      const range = ranges[i];
      result += text.slice(last, Math.min(range[0], sumRange[0] + maxlen));
      if (maxlen && range[0] >= sumRange[0] + maxlen) {
        break;
      }
      result += `<em>${text.slice(range[0], range[1])}</em>`;
      last = range[1];
      if (i === ranges.length - 1) {
        if (maxlen) {
          result += text.slice(
            range[1],
            Math.min(text.length, sumRange[0] + maxlen + 1),
          );
        } else {
          result += text.slice(range[1]);
        }
      }
    }
    return result;
  }

  function searchItem(icon, title, slug, preview, url) {
    title = title != null && title !== "" ? title : translation.untitled;
    const subtitle = slug
      ? `<span class="searchbox-result-title-secondary">(${slug})</span>`
      : "";

    // 依然返回 HTML 字符串，因为里面包含了高亮标签 <em>
    return `<a class="searchbox-result-item" href="${url}">
            <span class="searchbox-result-icon">
                <iconify-icon icon="${icon}" />
            </span>
            <span class="searchbox-result-content">
                <span class="searchbox-result-title">
                    ${title}
                    ${subtitle}
                </span>
                ${preview ? `<span class="searchbox-result-preview">${preview}</span>` : ""}
            </span>
        </a>`;
  }

  function sectionFactory(keywords, type, array) {
    if (array.length === 0) return null;
    const sectionTitle = translation[type.toLowerCase()];
    let searchItemsHTML = [];

    switch (type) {
      case "POSTS":
      case "PAGES":
        searchItemsHTML = array.map((item) => {
          const title = findAndHighlight(item.title, keywords);
          const text = findAndHighlight(item.text, keywords, 100);
          return searchItem(
            "mingcute:document-2-fill",
            title,
            null,
            text,
            item.link,
          );
        });
        break;
      case "CATEGORIES":
      case "TAGS":
        searchItemsHTML = array.map((item) => {
          const name = findAndHighlight(item.name, keywords);
          const slug = findAndHighlight(item.slug, keywords);
          return searchItem(
            type === "CATEGORIES"
              ? "mingcute:folder-fill"
              : "mingcute:tag-fill",
            name,
            slug,
            null,
            item.link,
          );
        });
        break;
      default:
        return null;
    }

    const sectionEl = section(sectionTitle);
    // 使用 innerHTML 插入生成的字符串数组
    sectionEl.insertAdjacentHTML("beforeend", searchItemsHTML.join(""));
    return sectionEl;
  }

  function parseKeywords(keywords) {
    return keywords
      .split(" ")
      .filter((keyword) => !!keyword)
      .map((keyword) => keyword.toLowerCase());
  }

  function filter(keywords, obj, fields) {
    const keywordArray = parseKeywords(keywords);
    const containKeywords = keywordArray.filter((keyword) => {
      const containFields = fields.filter((field) => {
        if (!Object.hasOwn(obj, field)) {
          return false;
        }
        if (obj[field].toLowerCase().indexOf(keyword) > -1) {
          return true;
        }
        return false;
      });
      return containFields.length > 0;
    });
    return containKeywords.length === keywordArray.length;
  }

  function filterFactory(keywords) {
    return {
      post: (obj) => filter(keywords, obj, ["title", "text"]),
      page: (obj) => filter(keywords, obj, ["title", "text"]),
      category: (obj) => filter(keywords, obj, ["name", "slug"]),
      tag: (obj) => filter(keywords, obj, ["name", "slug"]),
    };
  }

  function weight(keywords, obj, fields, weights) {
    let value = 0;
    parseKeywords(keywords).forEach((keyword) => {
      const pattern = new RegExp(keyword, "img");
      fields.forEach((field, index) => {
        if (Object.hasOwn(obj, field)) {
          const matches = obj[field].match(pattern);
          value += matches ? matches.length * weights[index] : 0;
        }
      });
    });
    return value;
  }

  function weightFactory(keywords) {
    return {
      post: (obj) => weight(keywords, obj, ["title", "text"], [3, 1]),
      page: (obj) => weight(keywords, obj, ["title", "text"], [3, 1]),
      category: (obj) => weight(keywords, obj, ["name", "slug"], [1, 1]),
      tag: (obj) => weight(keywords, obj, ["name", "slug"], [1, 1]),
    };
  }

  function search(json, keywords) {
    const weights = weightFactory(keywords);
    const filters = filterFactory(keywords);
    const posts = json.posts;
    const pages = json.pages;
    const tags = json.tags;
    const categories = json.categories;

    return {
      posts: posts
        .filter(filters.post)
        .sort((a, b) => weights.post(b) - weights.post(a))
        .slice(0, 5),
      pages: pages
        .filter(filters.page)
        .sort((a, b) => weights.page(b) - weights.page(a))
        .slice(0, 5),
      categories: categories
        .filter(filters.category)
        .sort((a, b) => weights.category(b) - weights.category(a))
        .slice(0, 5),
      tags: tags
        .filter(filters.tag)
        .sort((a, b) => weights.tag(b) - weights.tag(a))
        .slice(0, 5),
    };
  }

  function searchResultToDOM(keywords, searchResult) {
    container.innerHTML = ""; // Empty container
    for (const key in searchResult) {
      const sectionNode = sectionFactory(
        parseKeywords(keywords),
        key.toUpperCase(),
        searchResult[key],
      );
      if (sectionNode) {
        container.appendChild(sectionNode);
      }
    }
  }

  function scrollTo(item) {
    if (!item) return;
    const wrapperHeight = container.clientHeight;
    // 计算相对位置：item.offsetTop 是相对于 offsetParent 的，
    // 这里假设 container 是 positioning context (relative/absolute)
    // 如果不是，可能需要 getBoundingClientRect 计算
    const itemTop = item.offsetTop;
    const itemHeight = item.clientHeight;
    const scrollTop = container.scrollTop;

    // 到底部了？
    if (itemTop + itemHeight > scrollTop + wrapperHeight) {
      container.scrollTop = itemTop + itemHeight - wrapperHeight;
    }
    // 到顶部了？
    if (itemTop < scrollTop) {
      container.scrollTop = itemTop;
    }
  }

  function selectItemByDiff(value) {
    const items = Array.from(
      container.querySelectorAll(".searchbox-result-item"),
    );
    if (items.length === 0) return;

    let prevPosition = -1;
    items.forEach((item, index) => {
      if (item.classList.contains("active")) {
        prevPosition = index;
      }
    });

    // 计算新位置（处理负数取模的情况）
    const nextPosition = (items.length + prevPosition + value) % items.length;
    // 修正 JavaScript 负数取模 bug: -1 % 5 = -1 (应为 4)
    const finalPosition =
      nextPosition < 0 ? nextPosition + items.length : nextPosition;

    if (prevPosition !== -1) {
      items[prevPosition].classList.remove("active");
    }
    const nextItem = items[finalPosition];
    nextItem.classList.add("active");
    scrollTo(nextItem);
  }

  // Fetch JSON replacement
  fetch(config.contentUrl)
    .then((response) => response.json())
    .then((json) => {
      if (location.hash.trim() === "#insight-search") {
        main.classList.add("show");
      }

      input.addEventListener("input", function () {
        const keywords = this.value;
        searchResultToDOM(keywords, search(json, keywords));
      });

      // Trigger initial input event logic if needed (usually empty initially)
      const event = new Event("input");
      input.dispatchEvent(event);
    })
    .catch((err) =>
      console.error("Insight Search: Failed to load content.json", err),
    );

  let touch = false;

  // Event Delegation for Opening Search
  document.addEventListener("click", (e) => {
    // Click on search button
    if (e.target.closest(".navbar-main .search")) {
      main.classList.add("show");
      const inp = main.querySelector(".searchbox-input");
      if (inp) inp.focus();
    }
  });

  document.addEventListener("click", (e) => {
    handleSearchClicks(e);
  });

  document.addEventListener("touchend", (e) => {
    handleSearchClicks(e);
  });

  function handleSearchClicks(e) {
    const target = e.target;

    // Click Close Button
    const closeBtn = target.closest(".searchbox-close");
    if (closeBtn) {
      if (e.type === "click" || touch) {
        // Re-enable pointer events on navbar (original logic)
        const navbar = document.querySelector(".navbar-main");
        if (navbar) {
          navbar.style.pointerEvents = "none";
          setTimeout(() => {
            navbar.style.pointerEvents = "auto";
          }, 400);
        }
        main.classList.remove("show");
        touch = false;
      }
    }
  }

  document.addEventListener("keydown", (e) => {
    if (!main.classList.contains("show")) return;

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        main.classList.remove("show");
        break;
      case "ArrowUp":
        selectItemByDiff(-1);
        break;
      case "ArrowDown":
        selectItemByDiff(1);
        break;
      case "Enter": {
        const activeItem = container.querySelector(
          ".searchbox-result-item.active",
        );
        if (activeItem) {
          location.href = activeItem?.getAttribute("href");
        }
        break;
      }
    }
  });

  // Touch Tracking
  document.addEventListener("touchstart", () => {
    touch = true;
  });
  document.addEventListener("touchmove", () => {
    touch = false;
  });
}
