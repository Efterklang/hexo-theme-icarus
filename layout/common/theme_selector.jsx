const { Component } = require("inferno");
const { cacheComponent } = require("hexo-component-inferno/lib/util/cache");

class ThemeSelector extends Component {
    render() {
        return (
            <div class="theme-selector-modal" id="theme-selector-modal">
                <div class="theme-selector-backdrop"></div>
                <div class="theme-selector-content">
                    <div class="theme-selector-header">
                        <h3 class="theme-selector-title">Choose Theme</h3>
                        <div class="theme-selector-hint">Shortcuts: ⌘ ⇧ P</div>
                        <div class="theme-selector-hint">
                            ↑↓ Navigate • Enter Confirm • Esc Close
                        </div>
                    </div>
                    <div class="theme-selector-list">
                        <div class="theme-option" data-theme-option="system" data-index="0">
                            <span class="theme-emoji">🖥️</span>
                            <span class="theme-name">System</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <div class="theme-option" data-theme-option="latte" data-index="1">
                            <span class="theme-emoji">🌻</span>
                            <span class="theme-name">Latte</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <div class="theme-option" data-theme-option="nord" data-index="2">
                            <span class="theme-emoji">🦭</span>
                            <span class="theme-name">Nord</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <div
                            class="theme-option"
                            data-theme-option="macchiato"
                            data-index="3"
                        >
                            <span class="theme-emoji">🌺</span>
                            <span class="theme-name">Macchiato</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <div class="theme-option" data-theme-option="mocha" data-index="4">
                            <span class="theme-emoji">🌿</span>
                            <span class="theme-name">Mocha</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                        <div
                            class="theme-option"
                            data-theme-option="tokyo_night"
                            data-index="5"
                        >
                            <span class="theme-emoji">🏙</span>
                            <span class="theme-name">Tokyo Night</span>
                            <span class="theme-check">
                                <i class="fas fa-check"></i>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = cacheComponent(
    ThemeSelector,
    "common.themeselector",
    () => {
        return {};
    }
);
