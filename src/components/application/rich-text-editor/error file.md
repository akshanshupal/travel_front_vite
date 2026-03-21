<html lang="en" class="dark-mode jodit_fullsize-box_true" style="overflow: hidden;"><head><style>    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }</style><style id="ace-tm">.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}
/*# sourceURL=ace/css/ace-tm */</style><style id="ace_editor.css">.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}.ace_editor {position: relative;overflow: hidden;font: 12px/normal 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;direction: ltr;text-align: left;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;box-sizing: border-box;min-width: 100%;contain: style size layout;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: '';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;contain: style size layout;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {position: absolute;top: 0;left: 0;right: 0;padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {contain: strict;position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;contain: strict;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: transparent;color: inherit;z-index: 1000;opacity: 1;}.ace_composition_placeholder { color: transparent }.ace_composition_marker { border-bottom: 1px solid;position: absolute;border-radius: 0;margin-top: 1px;}[ace_nocontext=true] {transform: none!important;filter: none!important;perspective: none!important;clip-path: none!important;mask : none!important;contain: none!important;perspective: none!important;mix-blend-mode: initial!important;z-index: auto;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;height: 1000000px;contain: style size layout;}.ace_text-layer {font: inherit !important;position: absolute;height: 1000000px;width: 1000000px;contain: style size layout;}.ace_text-layer > .ace_line, .ace_text-layer > .ace_line_group {contain: style size layout;position: absolute;top: 0;left: 0;right: 0;}.ace_hidpi .ace_text-layer,.ace_hidpi .ace_gutter-layer,.ace_hidpi .ace_content,.ace_hidpi .ace_gutter {contain: strict;will-change: transform;}.ace_hidpi .ace_text-layer > .ace_line, .ace_hidpi .ace_text-layer > .ace_line_group {contain: strict;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {transition: opacity 0.18s;}.ace_animate-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: step-end;animation-name: blink-ace-animate;animation-iteration-count: infinite;}.ace_animate-blinking.ace_smooth-blinking .ace_cursor {animation-duration: 1000ms;animation-timing-function: ease-in-out;animation-name: blink-ace-animate-smooth;}@keyframes blink-ace-animate {from, to { opacity: 1; }60% { opacity: 0; }}@keyframes blink-ace-animate-smooth {from, to { opacity: 1; }45% { opacity: 1; }60% { opacity: 0; }85% { opacity: 0; }}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;box-sizing: border-box;}.ace_line .ace_fold {box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_inline_button {border: 1px solid lightgray;display: inline-block;margin: -1px 8px;padding: 0 5px;pointer-events: auto;cursor: pointer;}.ace_inline_button:hover {border-color: gray;background: rgba(200,200,200,0.2);display: inline-block;pointer-events: auto;}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}
/*# sourceURL=ace/css/ace_editor.css */</style><style id="react-aria-pressable-style">@layer {
  [data-react-aria-pressable] {
    touch-action: pan-x pan-y pinch-zoom;
  }
}</style>
      <script type="module">import { injectIntoGlobalHook } from "/@react-refresh";
injectIntoGlobalHook(window);
window.$RefreshReg$ = () => {};
window.$RefreshSig$ = () => (type) => type;</script>

      <script type="module" src="/@vite/client"></script>

        <meta charset="UTF-8">
        <link rel="icon" type="image/svg+xml" href="/vite.svg">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Generated by Untitled UI CLI">
        <meta name="theme-color" content="#7f56d9">

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400..700;1,14..32,400..700&amp;display=swap" rel="stylesheet">

        <title>Starter kit — Untitled UI</title>
    <style type="text/css" data-vite-dev-id="/Users/akshanshupal/Projects/Frontend/travel-next-react/tripzipper-vite/src/styles/globals.css">/*! tailwindcss v4.1.18 | MIT License | https://tailwindcss.com */
@layer properties;
@layer theme, base, components, utilities;
@layer theme {
  :root, :host {
    --font-sans: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
      "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-mono: ui-monospace, "Roboto Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    --color-red-50: oklch(97.1% 0.013 17.38);
    --color-red-500: oklch(63.7% 0.237 25.331);
    --color-red-600: oklch(57.7% 0.245 27.325);
    --color-orange-50: rgb(254 246 238);
    --color-orange-100: rgb(253 234 215);
    --color-orange-200: rgb(249 219 175);
    --color-orange-300: rgb(247 178 122);
    --color-orange-400: rgb(243 135 68);
    --color-orange-500: rgb(239 104 32);
    --color-orange-600: rgb(224 79 22);
    --color-orange-700: rgb(185 56 21);
    --color-orange-800: rgb(147 47 25);
    --color-orange-900: rgb(119 41 23);
    --color-orange-950: rgb(81 28 16);
    --color-amber-900: oklch(41.4% 0.112 45.904);
    --color-yellow-50: rgb(254 251 232);
    --color-yellow-100: rgb(254 247 195);
    --color-yellow-200: rgb(254 238 149);
    --color-yellow-300: rgb(253 226 114);
    --color-yellow-400: rgb(250 197 21);
    --color-yellow-500: rgb(234 170 8);
    --color-yellow-600: rgb(202 133 4);
    --color-yellow-700: rgb(161 92 7);
    --color-yellow-800: rgb(133 74 14);
    --color-yellow-900: rgb(113 59 18);
    --color-yellow-950: rgb(84 44 13);
    --color-lime-50: oklch(98.6% 0.031 120.757);
    --color-lime-700: oklch(53.2% 0.157 131.589);
    --color-green-50: rgb(237 252 242);
    --color-green-100: rgb(211 248 223);
    --color-green-200: rgb(170 240 196);
    --color-green-300: rgb(115 226 163);
    --color-green-400: rgb(60 203 127);
    --color-green-500: rgb(22 179 100);
    --color-green-600: rgb(9 146 80);
    --color-green-700: rgb(8 116 67);
    --color-green-800: rgb(9 92 55);
    --color-green-900: rgb(8 76 46);
    --color-green-950: rgb(5 46 28);
    --color-emerald-50: oklch(97.9% 0.021 166.113);
    --color-emerald-700: oklch(50.8% 0.118 165.612);
    --color-sky-50: oklch(97.7% 0.013 236.62);
    --color-sky-700: oklch(50% 0.134 242.749);
    --color-blue-50: rgb(239 248 255);
    --color-blue-100: rgb(209 233 255);
    --color-blue-200: rgb(178 221 255);
    --color-blue-300: rgb(132 202 255);
    --color-blue-400: rgb(83 177 253);
    --color-blue-500: rgb(46 144 250);
    --color-blue-600: rgb(21 112 239);
    --color-blue-700: rgb(23 92 211);
    --color-blue-800: rgb(24 73 169);
    --color-blue-900: rgb(25 65 133);
    --color-blue-950: rgb(16 42 86);
    --color-indigo-50: rgb(238 244 255);
    --color-indigo-100: rgb(224 234 255);
    --color-indigo-200: rgb(199 215 254);
    --color-indigo-300: rgb(164 188 253);
    --color-indigo-400: rgb(128 152 249);
    --color-indigo-500: rgb(97 114 243);
    --color-indigo-600: rgb(68 76 231);
    --color-indigo-700: rgb(53 56 205);
    --color-indigo-800: rgb(45 49 166);
    --color-indigo-900: rgb(45 50 130);
    --color-indigo-950: rgb(31 35 91);
    --color-purple-50: rgb(244 243 255);
    --color-purple-100: rgb(235 233 254);
    --color-purple-200: rgb(217 214 254);
    --color-purple-300: rgb(189 180 254);
    --color-purple-400: rgb(155 138 251);
    --color-purple-500: rgb(122 90 248);
    --color-purple-600: rgb(105 56 239);
    --color-purple-700: rgb(89 37 220);
    --color-purple-800: rgb(74 31 184);
    --color-purple-900: rgb(62 28 150);
    --color-purple-950: rgb(39 17 95);
    --color-fuchsia-50: rgb(253 244 255);
    --color-fuchsia-100: rgb(251 232 255);
    --color-fuchsia-200: rgb(246 208 254);
    --color-fuchsia-300: rgb(238 170 253);
    --color-fuchsia-400: rgb(228 120 250);
    --color-fuchsia-500: rgb(212 68 241);
    --color-fuchsia-600: rgb(186 36 213);
    --color-fuchsia-700: rgb(159 26 177);
    --color-fuchsia-800: rgb(130 24 144);
    --color-fuchsia-900: rgb(111 24 119);
    --color-fuchsia-950: rgb(71 16 76);
    --color-pink-50: rgb(253 242 250);
    --color-pink-100: rgb(252 231 246);
    --color-pink-200: rgb(252 206 238);
    --color-pink-300: rgb(250 167 224);
    --color-pink-400: rgb(246 112 199);
    --color-pink-500: rgb(238 70 188);
    --color-pink-600: rgb(221 37 144);
    --color-pink-700: rgb(193 21 116);
    --color-pink-800: rgb(158 22 95);
    --color-pink-900: rgb(133 22 81);
    --color-pink-950: rgb(78 13 48);
    --color-gray-50: rgb(250 250 250);
    --color-gray-100: rgb(245 245 245);
    --color-gray-200: rgb(233 234 235);
    --color-gray-300: rgb(213 215 218);
    --color-gray-400: rgb(164 167 174);
    --color-gray-500: rgb(113 118 128);
    --color-gray-600: rgb(83 88 98);
    --color-gray-700: rgb(65 70 81);
    --color-gray-800: rgb(37 43 55);
    --color-gray-900: rgb(24 29 39);
    --color-gray-950: rgb(10 13 18);
    --color-black: rgb(0 0 0);
    --color-white: rgb(255 255 255);
    --spacing: 0.25rem;
    --container-xs: 20rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    --container-3xl: 48rem;
    --container-4xl: 56rem;
    --container-5xl: 64rem;
    --container-6xl: 72rem;
    --container-7xl: 80rem;
    --text-xs: calc(var(--spacing) * 3);
    --text-xs--line-height: calc(var(--spacing) * 4.5);
    --text-sm: calc(var(--spacing) * 3.5);
    --text-sm--line-height: calc(var(--spacing) * 5);
    --text-base: 1rem;
    --text-base--line-height: calc(1.5 / 1);
    --text-lg: calc(var(--spacing) * 4.5);
    --text-lg--line-height: calc(var(--spacing) * 7);
    --text-xl: calc(var(--spacing) * 5);
    --text-xl--line-height: calc(var(--spacing) * 7.5);
    --text-2xl: 1.5rem;
    --text-2xl--line-height: calc(2 / 1.5);
    --text-3xl: 1.875rem;
    --text-3xl--line-height: calc(2.25 / 1.875);
    --text-4xl: 2.25rem;
    --text-4xl--line-height: calc(2.5 / 2.25);
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --font-weight-bold: 700;
    --font-weight-extrabold: 800;
    --tracking-tight: -0.025em;
    --tracking-wide: 0.025em;
    --radius-xs: 0.125rem;
    --radius-sm: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-3xl: 1.5rem;
    --shadow-xs: 0px 1px 2px rgba(10, 13, 18, 0.05);
    --drop-shadow-sm: 0 1px 2px rgb(0 0 0 / 0.15);
    --ease-in: cubic-bezier(0.4, 0, 1, 1);
    --ease-out: cubic-bezier(0, 0, 0.2, 1);
    --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
    --animate-spin: spin 1s linear infinite;
    --animate-pulse: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    --blur-xs: 4px;
    --blur-sm: 8px;
    --blur-md: 12px;
    --aspect-video: 16 / 9;
    --default-transition-duration: 150ms;
    --default-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    --default-font-family: var(--font-sans);
    --default-mono-font-family: var(--font-mono);
    --font-body: var(--font-inter, "Inter"), -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    --text-md: calc(var(--spacing) * 4);
    --text-md--line-height: calc(var(--spacing) * 6);
    --text-display-xs: calc(var(--spacing) * 6);
    --text-display-xs--line-height: calc(var(--spacing) * 8);
    --text-display-sm: calc(var(--spacing) * 7.5);
    --text-display-sm--line-height: calc(var(--spacing) * 9.5);
    --text-display-md: calc(var(--spacing) * 9);
    --text-display-md--line-height: calc(var(--spacing) * 11);
    --text-display-md--letter-spacing: -0.72px;
    --text-display-lg: calc(var(--spacing) * 12);
    --text-display-lg--line-height: calc(var(--spacing) * 15);
    --text-display-lg--letter-spacing: -0.96px;
    --text-display-xl: calc(var(--spacing) * 15);
    --text-display-xl--line-height: calc(var(--spacing) * 18);
    --text-display-xl--letter-spacing: -1.2px;
    --max-width-container: 1280px;
    --radius-none: 0px;
    --radius-full: 9999px;
    --shadow-skeumorphic: 0px 0px 0px 1px rgba(10, 13, 18, 0.18) inset, 0px -2px 0px 0px rgba(10, 13, 18, 0.05) inset;
    --animate-caret-blink: caret-blink 1s infinite;
    --color-transparent: rgb(0 0 0 / 0);
    --color-alpha-white: rgb(255 255 255);
    --color-alpha-black: rgb(0 0 0);
    --color-brand-50: rgb(239 248 255);
    --color-brand-100: rgb(209 233 255);
    --color-brand-200: rgb(178 221 255);
    --color-brand-300: rgb(132 202 255);
    --color-brand-400: rgb(83 177 253);
    --color-brand-500: rgb(46 144 250);
    --color-brand-600: rgb(21 112 239);
    --color-brand-700: rgb(23 92 211);
    --color-brand-800: rgb(24 73 169);
    --color-brand-900: rgb(25 65 133);
    --color-brand-950: rgb(16 42 86);
    --color-error-50: rgb(254 243 242);
    --color-error-100: rgb(254 228 226);
    --color-error-200: rgb(254 205 202);
    --color-error-300: rgb(253 162 155);
    --color-error-400: rgb(249 112 102);
    --color-error-500: rgb(240 68 56);
    --color-error-600: rgb(217 45 32);
    --color-error-700: rgb(180 35 24);
    --color-error-800: rgb(145 32 24);
    --color-error-900: rgb(122 39 26);
    --color-error-950: rgb(85 22 12);
    --color-warning-50: rgb(255 250 235);
    --color-warning-100: rgb(254 240 199);
    --color-warning-200: rgb(254 223 137);
    --color-warning-300: rgb(254 200 75);
    --color-warning-400: rgb(253 176 34);
    --color-warning-500: rgb(247 144 9);
    --color-warning-600: rgb(220 104 3);
    --color-warning-700: rgb(181 71 8);
    --color-warning-800: rgb(147 55 13);
    --color-warning-900: rgb(122 46 14);
    --color-warning-950: rgb(78 29 9);
    --color-success-50: rgb(236 253 243);
    --color-success-100: rgb(220 250 230);
    --color-success-200: rgb(171 239 198);
    --color-success-300: rgb(117 224 167);
    --color-success-400: rgb(71 205 137);
    --color-success-500: rgb(23 178 106);
    --color-success-600: rgb(7 148 85);
    --color-success-700: rgb(6 118 71);
    --color-success-800: rgb(8 93 58);
    --color-success-900: rgb(7 77 49);
    --color-success-950: rgb(5 51 33);
    --color-gray-25: rgb(253 253 253);
    --color-gray-blue-50: rgb(248 249 252);
    --color-gray-blue-100: rgb(234 236 245);
    --color-gray-blue-200: rgb(213 217 235);
    --color-gray-blue-300: rgb(179 184 219);
    --color-gray-blue-400: rgb(113 123 188);
    --color-gray-blue-500: rgb(78 91 166);
    --color-gray-blue-600: rgb(62 71 132);
    --color-gray-blue-700: rgb(54 63 114);
    --color-gray-blue-800: rgb(41 48 86);
    --color-gray-blue-900: rgb(16 19 35);
    --color-gray-blue-950: rgb(13 15 28);
    --color-blue-light-50: rgb(240 249 255);
    --color-blue-light-100: rgb(224 242 254);
    --color-blue-light-200: rgb(185 230 254);
    --color-blue-light-300: rgb(124 212 253);
    --color-blue-light-400: rgb(54 191 250);
    --color-blue-light-500: rgb(11 165 236);
    --color-blue-light-600: rgb(0 134 201);
    --color-blue-light-700: rgb(2 106 162);
    --color-blue-light-800: rgb(6 89 134);
    --color-blue-light-900: rgb(11 74 111);
    --color-blue-light-950: rgb(6 44 65);
    --color-blue-dark-50: rgb(239 244 255);
    --color-blue-dark-100: rgb(209 224 255);
    --color-blue-dark-200: rgb(178 204 255);
    --color-blue-dark-300: rgb(132 173 255);
    --color-blue-dark-400: rgb(82 139 255);
    --color-blue-dark-500: rgb(41 112 255);
    --color-blue-dark-600: rgb(21 94 239);
    --color-blue-dark-700: rgb(0 78 235);
    --color-blue-dark-800: rgb(0 64 193);
    --color-blue-dark-900: rgb(0 53 158);
    --color-blue-dark-950: rgb(0 34 102);
    --color-orange-dark-50: rgb(255 244 237);
    --color-orange-dark-100: rgb(255 230 213);
    --color-orange-dark-200: rgb(255 214 174);
    --color-orange-dark-300: rgb(255 156 102);
    --color-orange-dark-400: rgb(255 105 46);
    --color-orange-dark-500: rgb(255 68 5);
    --color-orange-dark-600: rgb(230 46 5);
    --color-orange-dark-700: rgb(188 27 6);
    --color-orange-dark-800: rgb(151 24 12);
    --color-orange-dark-900: rgb(119 26 13);
    --color-orange-dark-950: rgb(87 19 10);
    --color-utility-blue-50: var(--color-blue-50);
    --color-utility-blue-100: var(--color-blue-100);
    --color-utility-blue-200: var(--color-blue-200);
    --color-utility-blue-400: var(--color-blue-400);
    --color-utility-blue-500: var(--color-blue-500);
    --color-utility-blue-700: var(--color-blue-700);
    --color-utility-brand-50: var(--color-brand-50);
    --color-utility-brand-100: var(--color-brand-100);
    --color-utility-brand-200: var(--color-brand-200);
    --color-utility-brand-400: var(--color-brand-400);
    --color-utility-brand-500: var(--color-brand-500);
    --color-utility-brand-700: var(--color-brand-700);
    --color-utility-gray-50: var(--color-gray-50);
    --color-utility-gray-100: var(--color-gray-100);
    --color-utility-gray-200: var(--color-gray-200);
    --color-utility-gray-300: var(--color-gray-300);
    --color-utility-gray-400: var(--color-gray-400);
    --color-utility-gray-500: var(--color-gray-500);
    --color-utility-gray-600: var(--color-gray-600);
    --color-utility-gray-700: var(--color-gray-700);
    --color-utility-gray-800: var(--color-gray-800);
    --color-utility-gray-900: var(--color-gray-900);
    --color-utility-error-50: var(--color-error-50);
    --color-utility-error-100: var(--color-error-100);
    --color-utility-error-200: var(--color-error-200);
    --color-utility-error-400: var(--color-error-400);
    --color-utility-error-500: var(--color-error-500);
    --color-utility-error-700: var(--color-error-700);
    --color-utility-warning-50: var(--color-warning-50);
    --color-utility-warning-100: var(--color-warning-100);
    --color-utility-warning-200: var(--color-warning-200);
    --color-utility-warning-400: var(--color-warning-400);
    --color-utility-warning-500: var(--color-warning-500);
    --color-utility-warning-700: var(--color-warning-700);
    --color-utility-success-50: var(--color-success-50);
    --color-utility-success-100: var(--color-success-100);
    --color-utility-success-200: var(--color-success-200);
    --color-utility-success-400: var(--color-success-400);
    --color-utility-success-500: var(--color-success-500);
    --color-utility-success-700: var(--color-success-700);
    --color-utility-orange-50: var(--color-orange-50);
    --color-utility-orange-100: var(--color-orange-100);
    --color-utility-orange-200: var(--color-orange-200);
    --color-utility-orange-400: var(--color-orange-400);
    --color-utility-orange-500: var(--color-orange-500);
    --color-utility-orange-700: var(--color-orange-700);
    --color-utility-indigo-50: var(--color-indigo-50);
    --color-utility-indigo-100: var(--color-indigo-100);
    --color-utility-indigo-200: var(--color-indigo-200);
    --color-utility-indigo-400: var(--color-indigo-400);
    --color-utility-indigo-500: var(--color-indigo-500);
    --color-utility-indigo-700: var(--color-indigo-700);
    --color-utility-pink-50: var(--color-pink-50);
    --color-utility-pink-100: var(--color-pink-100);
    --color-utility-pink-200: var(--color-pink-200);
    --color-utility-pink-400: var(--color-pink-400);
    --color-utility-pink-500: var(--color-pink-500);
    --color-utility-pink-700: var(--color-pink-700);
    --color-utility-purple-50: var(--color-purple-50);
    --color-utility-purple-100: var(--color-purple-100);
    --color-utility-purple-200: var(--color-purple-200);
    --color-utility-purple-400: var(--color-purple-400);
    --color-utility-purple-500: var(--color-purple-500);
    --color-utility-purple-700: var(--color-purple-700);
    --color-utility-blue-light-50: var(--color-blue-light-50);
    --color-utility-blue-light-100: var(--color-blue-light-100);
    --color-utility-blue-light-200: var(--color-blue-light-200);
    --color-utility-blue-light-400: var(--color-blue-light-400);
    --color-utility-blue-light-500: var(--color-blue-light-500);
    --color-utility-blue-light-700: var(--color-blue-light-700);
    --color-utility-gray-blue-50: var(--color-gray-blue-50);
    --color-utility-gray-blue-100: var(--color-gray-blue-100);
    --color-utility-gray-blue-200: var(--color-gray-blue-200);
    --color-utility-gray-blue-400: var(--color-gray-blue-400);
    --color-utility-gray-blue-500: var(--color-gray-blue-500);
    --color-utility-gray-blue-700: var(--color-gray-blue-700);
    --color-text-primary: var(--color-gray-900);
    --color-text-secondary: var(--color-gray-700);
    --color-text-secondary_hover: var(--color-gray-800);
    --color-text-tertiary: var(--color-gray-600);
    --color-text-tertiary_hover: var(--color-gray-700);
    --color-text-quaternary: var(--color-gray-500);
    --color-text-error-primary: var(--color-error-600);
    --color-text-error-primary_hover: var(--color-error-700);
    --color-text-warning-primary: var(--color-warning-600);
    --color-text-success-primary: var(--color-success-600);
    --color-text-disabled: var(--color-gray-500);
    --color-text-placeholder: var(--color-gray-500);
    --color-text-placeholder_subtle: var(--color-gray-300);
    --color-text-primary_on-brand: var(--color-white);
    --color-text-secondary_on-brand: var(--color-brand-200);
    --color-text-tertiary_on-brand: var(--color-brand-200);
    --color-text-quaternary_on-brand: var(--color-brand-300);
    --color-text-brand-primary: var(--color-brand-900);
    --color-text-brand-secondary: var(--color-brand-700);
    --color-text-brand-secondary_hover: var(--color-brand-800);
    --color-text-brand-tertiary: var(--color-brand-600);
    --color-text-brand-tertiary_alt: var(--color-brand-600);
    --color-border-primary: var(--color-gray-300);
    --color-border-secondary: var(--color-gray-200);
    --color-border-secondary_alt: rgb(0 0 0 / 0.08);
    --color-border-tertiary: var(--color-gray-100);
    --color-border-error: var(--color-error-500);
    --color-border-error_subtle: var(--color-error-300);
    --color-border-disabled: var(--color-gray-300);
    --color-border-disabled_subtle: var(--color-gray-200);
    --color-border-brand: var(--color-brand-500);
    --color-border-brand_alt: var(--color-brand-600);
    --color-fg-white: var(--color-white);
    --color-fg-primary: var(--color-gray-900);
    --color-fg-secondary: var(--color-gray-700);
    --color-fg-secondary_hover: var(--color-gray-800);
    --color-fg-tertiary: var(--color-gray-600);
    --color-fg-quaternary: var(--color-gray-400);
    --color-fg-quaternary_hover: var(--color-gray-500);
    --color-fg-warning-primary: var(--color-warning-600);
    --color-fg-success-primary: var(--color-success-600);
    --color-fg-success-secondary: var(--color-success-500);
    --color-fg-error-primary: var(--color-error-600);
    --color-fg-error-secondary: var(--color-error-500);
    --color-fg-disabled: var(--color-gray-400);
    --color-fg-disabled_subtle: var(--color-gray-300);
    --color-fg-brand-primary: var(--color-brand-600);
    --color-fg-brand-primary_alt: var(--color-fg-brand-primary);
    --color-fg-brand-secondary: var(--color-brand-500);
    --color-fg-brand-secondary_alt: var(--color-fg-brand-secondary);
    --color-fg-brand-secondary_hover: var(--color-brand-600);
    --color-bg-primary: var(--color-white);
    --color-bg-primary-solid: var(--color-gray-950);
    --color-bg-primary_alt: var(--color-white);
    --color-bg-primary_hover: var(--color-gray-50);
    --color-bg-secondary: var(--color-gray-50);
    --color-bg-secondary-solid: var(--color-gray-600);
    --color-bg-secondary_subtle: var(--color-gray-25);
    --color-bg-secondary_hover: var(--color-gray-100);
    --color-bg-secondary_alt: var(--color-gray-50);
    --color-bg-tertiary: var(--color-gray-100);
    --color-bg-quaternary: var(--color-gray-200);
    --color-bg-error-primary: var(--color-error-50);
    --color-bg-error-secondary: var(--color-error-100);
    --color-bg-error-solid: var(--color-error-600);
    --color-bg-error-solid_hover: var(--color-error-700);
    --color-bg-warning-primary: var(--color-warning-50);
    --color-bg-warning-secondary: var(--color-warning-100);
    --color-bg-warning-solid: var(--color-warning-600);
    --color-bg-success-primary: var(--color-success-50);
    --color-bg-success-secondary: var(--color-success-100);
    --color-bg-success-solid: var(--color-success-600);
    --color-bg-disabled: var(--color-gray-100);
    --color-bg-disabled_subtle: var(--color-gray-50);
    --color-bg-active: var(--color-gray-50);
    --color-bg-overlay: var(--color-gray-950);
    --color-bg-brand-primary: var(--color-brand-50);
    --color-bg-brand-primary_alt: var(--color-brand-50);
    --color-bg-brand-secondary: var(--color-brand-100);
    --color-bg-brand-solid: var(--color-brand-600);
    --color-bg-brand-solid_hover: var(--color-brand-700);
    --color-bg-brand-section: var(--color-brand-800);
    --color-bg-brand-section_subtle: var(--color-brand-700);
    --color-app-store-badge-border: rgb(166 166 166);
    --color-avatar-bg: var(--color-gray-100);
    --color-avatar-contrast-border: rgb(0 0 0 / 0.08);
    --color-button-destructive-primary-icon: var(--color-error-300);
    --color-button-destructive-primary-icon_hover: var(--color-error-200);
    --color-button-primary-icon: var(--color-brand-300);
    --color-button-primary-icon_hover: var(--color-brand-200);
    --color-featured-icon-light-fg-brand: var(--color-brand-600);
    --color-featured-icon-light-fg-error: var(--color-error-600);
    --color-featured-icon-light-fg-gray: var(--color-gray-500);
    --color-featured-icon-light-fg-success: var(--color-success-600);
    --color-featured-icon-light-fg-warning: var(--color-warning-600);
    --color-focus-ring: var(--color-brand-500);
    --color-slider-handle-bg: var(--color-white);
    --color-slider-handle-border: var(--color-brand-600);
    --color-toggle-border: var(--color-gray-300);
    --color-toggle-button-fg_disabled: var(--color-gray-50);
    --color-toggle-slim-border_pressed-hover: var(--color-bg-brand-solid_hover);
    --color-toggle-slim-border_pressed: var(--color-bg-brand-solid);
    --color-tooltip-supporting-text: var(--color-gray-300);
    --background-color-primary: var(--color-bg-primary);
    --background-color-primary-solid: var(--color-bg-primary-solid);
    --background-color-primary_alt: var(--color-bg-primary_alt);
    --background-color-primary_hover: var(--color-bg-primary_hover);
    --background-color-secondary: var(--color-bg-secondary);
    --background-color-secondary-solid: var(--color-bg-secondary-solid);
    --background-color-secondary_alt: var(--color-bg-secondary_alt);
    --background-color-secondary_hover: var(--color-bg-secondary_hover);
    --background-color-tertiary: var(--color-bg-tertiary);
    --background-color-quaternary: var(--color-bg-quaternary);
    --background-color-brand-solid: var(--color-bg-brand-solid);
    --background-color-active: var(--color-bg-active);
    --background-color-disabled: var(--color-bg-disabled);
    --background-color-disabled_subtle: var(--color-bg-disabled_subtle);
    --background-color-overlay: var(--color-bg-overlay);
    --background-color-brand-primary_alt: var(--color-bg-brand-primary_alt);
    --background-color-brand-secondary: var(--color-bg-brand-secondary);
    --background-color-brand-solid_hover: var(--color-bg-brand-solid_hover);
    --background-color-error-primary: var(--color-bg-error-primary);
    --background-color-error-secondary: var(--color-bg-error-secondary);
    --background-color-error-solid: var(--color-bg-error-solid);
    --background-color-error-solid_hover: var(--color-bg-error-solid_hover);
    --background-color-warning-primary: var(--color-bg-warning-primary);
    --background-color-warning-secondary: var(--color-bg-warning-secondary);
    --background-color-warning-solid: var(--color-bg-warning-solid);
    --background-color-success-primary: var(--color-bg-success-primary);
    --background-color-success-secondary: var(--color-bg-success-secondary);
    --background-color-success-solid: var(--color-bg-success-solid);
    --text-color-primary: var(--color-text-primary);
    --text-color-primary_on-brand: var(--color-text-primary_on-brand);
    --text-color-secondary: var(--color-text-secondary);
    --text-color-secondary_hover: var(--color-text-secondary_hover);
    --text-color-secondary_on-brand: var(--color-text-secondary_on-brand);
    --text-color-tertiary: var(--color-text-tertiary);
    --text-color-tertiary_hover: var(--color-text-tertiary_hover);
    --text-color-quaternary: var(--color-text-quaternary);
    --text-color-disabled: var(--color-text-disabled);
    --text-color-placeholder: var(--color-text-placeholder);
    --text-color-placeholder_subtle: var(--color-text-placeholder_subtle);
    --text-color-brand-secondary: var(--color-text-brand-secondary);
    --text-color-brand-secondary_hover: var(--color-text-brand-secondary_hover);
    --text-color-brand-tertiary: var(--color-text-brand-tertiary);
    --text-color-brand-tertiary_alt: var(--color-text-brand-tertiary_alt);
    --text-color-error-primary: var(--color-text-error-primary);
    --text-color-error-primary_hover: var(--color-text-error-primary_hover);
    --text-color-warning-primary: var(--color-text-warning-primary);
    --text-color-success-primary: var(--color-text-success-primary);
    --text-color-tooltip-supporting-text: var(--color-tooltip-supporting-text);
    --border-color-primary: var(--color-border-primary);
    --border-color-secondary: var(--color-border-secondary);
    --border-color-disabled: var(--color-border-disabled);
    --border-color-brand: var(--color-border-brand);
    --border-color-brand_alt: var(--color-border-brand_alt);
    --ring-color-primary: var(--color-border-primary);
    --ring-color-secondary: var(--color-border-secondary);
    --ring-color-secondary_alt: var(--color-border-secondary_alt);
    --ring-color-error: var(--color-border-error);
    --ring-color-error_subtle: var(--color-border-error_subtle);
    --ring-color-disabled: var(--color-border-disabled);
    --ring-color-disabled_subtle: var(--color-border-disabled_subtle);
    --ring-color-brand: var(--color-border-brand);
    --ring-color-brand_alt: var(--color-border-brand_alt);
    --ring-color-bg-brand-solid: var(--color-bg-brand-solid);
    --outline-color-error: var(--color-border-error);
    --outline-color-brand: var(--color-border-brand);
  }
}
@layer base {
  *, ::after, ::before, ::backdrop, ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }
  html, :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(--default-font-family, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }
  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }
  abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: inherit;
  }
  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }
  b, strong {
    font-weight: bolder;
  }
  code, kbd, samp, pre {
    font-family: var(--default-mono-font-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(--default-mono-font-variation-settings, normal);
    font-size: 1em;
  }
  small {
    font-size: 80%;
  }
  sub, sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }
  :-moz-focusring {
    outline: auto;
  }
  progress {
    vertical-align: baseline;
  }
  summary {
    display: list-item;
  }
  ol, ul, menu {
    list-style: none;
  }
  img, svg, video, canvas, audio, iframe, embed, object {
    display: block;
    vertical-align: middle;
  }
  img, video {
    max-width: 100%;
    height: auto;
  }
  button, input, select, optgroup, textarea, ::file-selector-button {
    font: inherit;
    font-feature-settings: inherit;
    font-variation-settings: inherit;
    letter-spacing: inherit;
    color: inherit;
    border-radius: 0;
    background-color: transparent;
    opacity: 1;
  }
  :where(select:is([multiple], [size])) optgroup {
    font-weight: bolder;
  }
  :where(select:is([multiple], [size])) optgroup option {
    padding-inline-start: 20px;
  }
  ::file-selector-button {
    margin-inline-end: 4px;
  }
  ::placeholder {
    opacity: 1;
  }
  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px) {
    ::placeholder {
      color: currentcolor;
      @supports (color: color-mix(in lab, red, red)) {
        color: color-mix(in oklab, currentcolor 50%, transparent);
      }
    }
  }
  textarea {
    resize: vertical;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-date-and-time-value {
    min-height: 1lh;
    text-align: inherit;
  }
  ::-webkit-datetime-edit {
    display: inline-flex;
  }
  ::-webkit-datetime-edit-fields-wrapper {
    padding: 0;
  }
  ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field {
    padding-block: 0;
  }
  ::-webkit-calendar-picker-indicator {
    line-height: 1;
  }
  :-moz-ui-invalid {
    box-shadow: none;
  }
  button, input:where([type="button"], [type="reset"], [type="submit"]), ::file-selector-button {
    appearance: button;
  }
  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button {
    height: auto;
  }
  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }
}
@layer utilities {
  .pointer-events-none {
    pointer-events: none;
  }
  .collapse {
    visibility: collapse;
  }
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
    border-width: 0;
  }
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .relative {
    position: relative;
  }
  .sticky {
    position: sticky;
  }
  .inset-0 {
    inset: calc(var(--spacing) * 0);
  }
  .inset-x-13 {
    inset-inline: calc(var(--spacing) * 13);
  }
  .inset-y-0 {
    inset-block: calc(var(--spacing) * 0);
  }
  .inset-y-0\.5 {
    inset-block: calc(var(--spacing) * 0.5);
  }
  .-top-2 {
    top: calc(var(--spacing) * -2);
  }
  .top-0 {
    top: calc(var(--spacing) * 0);
  }
  .top-1\.5 {
    top: calc(var(--spacing) * 1.5);
  }
  .top-1\/2 {
    top: calc(1/2 * 100%);
  }
  .top-2 {
    top: calc(var(--spacing) * 2);
  }
  .top-2\.5 {
    top: calc(var(--spacing) * 2.5);
  }
  .top-3 {
    top: calc(var(--spacing) * 3);
  }
  .top-4 {
    top: calc(var(--spacing) * 4);
  }
  .top-full {
    top: 100%;
  }
  .-right-0\.5 {
    right: calc(var(--spacing) * -0.5);
  }
  .-right-px {
    right: -1px;
  }
  .right-0 {
    right: calc(var(--spacing) * 0);
  }
  .right-0\.5 {
    right: calc(var(--spacing) * 0.5);
  }
  .right-1 {
    right: calc(var(--spacing) * 1);
  }
  .right-1\.5 {
    right: calc(var(--spacing) * 1.5);
  }
  .right-2 {
    right: calc(var(--spacing) * 2);
  }
  .right-3 {
    right: calc(var(--spacing) * 3);
  }
  .right-3\.5 {
    right: calc(var(--spacing) * 3.5);
  }
  .right-4 {
    right: calc(var(--spacing) * 4);
  }
  .-bottom-0\.5 {
    bottom: calc(var(--spacing) * -0.5);
  }
  .-bottom-2 {
    bottom: calc(var(--spacing) * -2);
  }
  .-bottom-px {
    bottom: -1px;
  }
  .bottom-0 {
    bottom: calc(var(--spacing) * 0);
  }
  .bottom-0\.5 {
    bottom: calc(var(--spacing) * 0.5);
  }
  .bottom-1 {
    bottom: calc(var(--spacing) * 1);
  }
  .bottom-2 {
    bottom: calc(var(--spacing) * 2);
  }
  .bottom-3 {
    bottom: calc(var(--spacing) * 3);
  }
  .bottom-5 {
    bottom: calc(var(--spacing) * 5);
  }
  .left-0 {
    left: calc(var(--spacing) * 0);
  }
  .left-1\/2 {
    left: calc(1/2 * 100%);
  }
  .left-2\.5 {
    left: calc(var(--spacing) * 2.5);
  }
  .left-3 {
    left: calc(var(--spacing) * 3);
  }
  .left-3\.5 {
    left: calc(var(--spacing) * 3.5);
  }
  .left-full {
    left: 100%;
  }
  .z-0 {
    z-index: 0;
  }
  .z-1 {
    z-index: 1;
  }
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .z-30 {
    z-index: 30;
  }
  .z-50 {
    z-index: 50;
  }
  .order-first {
    order: -9999;
  }
  .order-last {
    order: 9999;
  }
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-full {
    grid-column: 1 / -1;
  }
  .container {
    width: 100%;
    @media (width >= 320px) {
      max-width: 320px;
    }
    @media (width >= 600px) {
      max-width: 600px;
    }
    @media (width >= 40rem) {
      max-width: 40rem;
    }
    @media (width >= 48rem) {
      max-width: 48rem;
    }
    @media (width >= 64rem) {
      max-width: 64rem;
    }
    @media (width >= 80rem) {
      max-width: 80rem;
    }
    @media (width >= 96rem) {
      max-width: 96rem;
    }
  }
  .m-0 {
    margin: calc(var(--spacing) * 0);
  }
  .m-2 {
    margin: calc(var(--spacing) * 2);
  }
  .m-4 {
    margin: calc(var(--spacing) * 4);
  }
  .m-5 {
    margin: calc(var(--spacing) * 5);
  }
  .mx-1 {
    margin-inline: calc(var(--spacing) * 1);
  }
  .mx-auto {
    margin-inline: auto;
  }
  .-my-px {
    margin-block: -1px;
  }
  .my-1 {
    margin-block: calc(var(--spacing) * 1);
  }
  .my-4 {
    margin-block: calc(var(--spacing) * 4);
  }
  .my-auto {
    margin-block: auto;
  }
  .prose {
    color: var(--tw-prose-body);
    max-width: 65ch;
    :where(p):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }
    :where([class~="lead"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-lead);
      font-size: 1.25em;
      line-height: 1.6;
      margin-top: 1.2em;
      margin-bottom: 1.2em;
    }
    :where(a):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-links);
      text-decoration: underline;
      font-weight: 500;
    }
    :where(strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-bold);
      font-weight: 600;
    }
    :where(a strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(blockquote strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(thead th strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(ol):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: decimal;
      margin-top: 1.25em;
      margin-bottom: 1.25em;
      padding-inline-start: 1.625em;
    }
    :where(ol[type="A"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: upper-alpha;
    }
    :where(ol[type="a"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: lower-alpha;
    }
    :where(ol[type="A" s]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: upper-alpha;
    }
    :where(ol[type="a" s]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: lower-alpha;
    }
    :where(ol[type="I"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: upper-roman;
    }
    :where(ol[type="i"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: lower-roman;
    }
    :where(ol[type="I" s]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: upper-roman;
    }
    :where(ol[type="i" s]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: lower-roman;
    }
    :where(ol[type="1"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: decimal;
    }
    :where(ul):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      list-style-type: disc;
      margin-top: 1.25em;
      margin-bottom: 1.25em;
      padding-inline-start: 1.625em;
    }
    :where(ol > li):not(:where([class~="not-prose"],[class~="not-prose"] *))::marker {
      font-weight: 400;
      color: var(--tw-prose-counters);
    }
    :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *))::marker {
      color: var(--tw-prose-bullets);
    }
    :where(dt):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 600;
      margin-top: 1.25em;
    }
    :where(hr):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      border-color: var(--tw-prose-hr);
      border-top-width: 1px;
      margin-top: 3em;
      margin-bottom: 3em;
    }
    :where(blockquote):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 500;
      font-style: italic;
      color: var(--tw-prose-quotes);
      border-inline-start-width: 0.25rem;
      border-inline-start-color: var(--tw-prose-quote-borders);
      quotes: "\201C""\201D""\2018""\2019";
      margin-top: 1.6em;
      margin-bottom: 1.6em;
      padding-inline-start: 1em;
    }
    :where(blockquote p:first-of-type):not(:where([class~="not-prose"],[class~="not-prose"] *))::before {
      content: open-quote;
    }
    :where(blockquote p:last-of-type):not(:where([class~="not-prose"],[class~="not-prose"] *))::after {
      content: close-quote;
    }
    :where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 800;
      font-size: 2.25em;
      margin-top: 0;
      margin-bottom: 0.8888889em;
      line-height: 1.1111111;
    }
    :where(h1 strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 900;
      color: inherit;
    }
    :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 700;
      font-size: 1.5em;
      margin-top: 2em;
      margin-bottom: 1em;
      line-height: 1.3333333;
    }
    :where(h2 strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 800;
      color: inherit;
    }
    :where(h3):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 600;
      font-size: 1.25em;
      margin-top: 1.6em;
      margin-bottom: 0.6em;
      line-height: 1.6;
    }
    :where(h3 strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 700;
      color: inherit;
    }
    :where(h4):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 600;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      line-height: 1.5;
    }
    :where(h4 strong):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 700;
      color: inherit;
    }
    :where(img):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 2em;
      margin-bottom: 2em;
    }
    :where(picture):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      display: block;
      margin-top: 2em;
      margin-bottom: 2em;
    }
    :where(video):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 2em;
      margin-bottom: 2em;
    }
    :where(kbd):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-weight: 500;
      font-family: inherit;
      color: var(--tw-prose-kbd);
      box-shadow: 0 0 0 1px var(--tw-prose-kbd-shadows), 0 3px 0 var(--tw-prose-kbd-shadows);
      font-size: 0.875em;
      border-radius: 0.3125rem;
      padding-top: 0.1875em;
      padding-inline-end: 0.375em;
      padding-bottom: 0.1875em;
      padding-inline-start: 0.375em;
    }
    :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-code);
      font-weight: 600;
      font-size: 0.875em;
    }
    :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *))::before {
      content: "`";
    }
    :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *))::after {
      content: "`";
    }
    :where(a code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(h1 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(h2 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
      font-size: 0.875em;
    }
    :where(h3 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
      font-size: 0.9em;
    }
    :where(h4 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(blockquote code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(thead th code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: inherit;
    }
    :where(pre):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-pre-code);
      background-color: var(--tw-prose-pre-bg);
      overflow-x: auto;
      font-weight: 400;
      font-size: 0.875em;
      line-height: 1.7142857;
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
      border-radius: 0.375rem;
      padding-top: 0.8571429em;
      padding-inline-end: 1.1428571em;
      padding-bottom: 0.8571429em;
      padding-inline-start: 1.1428571em;
    }
    :where(pre code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      background-color: transparent;
      border-width: 0;
      border-radius: 0;
      padding: 0;
      font-weight: inherit;
      color: inherit;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
    }
    :where(pre code):not(:where([class~="not-prose"],[class~="not-prose"] *))::before {
      content: none;
    }
    :where(pre code):not(:where([class~="not-prose"],[class~="not-prose"] *))::after {
      content: none;
    }
    :where(table):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      width: 100%;
      table-layout: auto;
      margin-top: 2em;
      margin-bottom: 2em;
      font-size: 0.875em;
      line-height: 1.7142857;
    }
    :where(thead):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      border-bottom-width: 1px;
      border-bottom-color: var(--tw-prose-th-borders);
    }
    :where(thead th):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-headings);
      font-weight: 600;
      vertical-align: bottom;
      padding-inline-end: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-inline-start: 0.5714286em;
    }
    :where(tbody tr):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      border-bottom-width: 1px;
      border-bottom-color: var(--tw-prose-td-borders);
    }
    :where(tbody tr:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      border-bottom-width: 0;
    }
    :where(tbody td):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      vertical-align: baseline;
    }
    :where(tfoot):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      border-top-width: 1px;
      border-top-color: var(--tw-prose-th-borders);
    }
    :where(tfoot td):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      vertical-align: top;
    }
    :where(th, td):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      text-align: start;
    }
    :where(figure > *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
      margin-bottom: 0;
    }
    :where(figcaption):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      color: var(--tw-prose-captions);
      font-size: 0.875em;
      line-height: 1.4285714;
      margin-top: 0.8571429em;
    }
    --tw-prose-body: oklch(37.3% 0.034 259.733);
    --tw-prose-headings: oklch(21% 0.034 264.665);
    --tw-prose-lead: oklch(44.6% 0.03 256.802);
    --tw-prose-links: oklch(21% 0.034 264.665);
    --tw-prose-bold: oklch(21% 0.034 264.665);
    --tw-prose-counters: oklch(55.1% 0.027 264.364);
    --tw-prose-bullets: oklch(87.2% 0.01 258.338);
    --tw-prose-hr: oklch(92.8% 0.006 264.531);
    --tw-prose-quotes: oklch(21% 0.034 264.665);
    --tw-prose-quote-borders: oklch(92.8% 0.006 264.531);
    --tw-prose-captions: oklch(55.1% 0.027 264.364);
    --tw-prose-kbd: oklch(21% 0.034 264.665);
    --tw-prose-kbd-shadows: color-mix(in oklab, oklch(21% 0.034 264.665) 10%, transparent);
    --tw-prose-code: oklch(21% 0.034 264.665);
    --tw-prose-pre-code: oklch(92.8% 0.006 264.531);
    --tw-prose-pre-bg: oklch(27.8% 0.033 256.848);
    --tw-prose-th-borders: oklch(87.2% 0.01 258.338);
    --tw-prose-td-borders: oklch(92.8% 0.006 264.531);
    --tw-prose-invert-body: oklch(87.2% 0.01 258.338);
    --tw-prose-invert-headings: #fff;
    --tw-prose-invert-lead: oklch(70.7% 0.022 261.325);
    --tw-prose-invert-links: #fff;
    --tw-prose-invert-bold: #fff;
    --tw-prose-invert-counters: oklch(70.7% 0.022 261.325);
    --tw-prose-invert-bullets: oklch(44.6% 0.03 256.802);
    --tw-prose-invert-hr: oklch(37.3% 0.034 259.733);
    --tw-prose-invert-quotes: oklch(96.7% 0.003 264.542);
    --tw-prose-invert-quote-borders: oklch(37.3% 0.034 259.733);
    --tw-prose-invert-captions: oklch(70.7% 0.022 261.325);
    --tw-prose-invert-kbd: #fff;
    --tw-prose-invert-kbd-shadows: rgb(255 255 255 / 10%);
    --tw-prose-invert-code: #fff;
    --tw-prose-invert-pre-code: oklch(87.2% 0.01 258.338);
    --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
    --tw-prose-invert-th-borders: oklch(44.6% 0.03 256.802);
    --tw-prose-invert-td-borders: oklch(37.3% 0.034 259.733);
    font-size: 1rem;
    line-height: 1.75;
    :where(picture > img):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
      margin-bottom: 0;
    }
    :where(li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    :where(ol > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0.375em;
    }
    :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0.375em;
    }
    :where(.prose > ul > li p):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }
    :where(.prose > ul > li > p:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.25em;
    }
    :where(.prose > ul > li > p:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 1.25em;
    }
    :where(.prose > ol > li > p:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.25em;
    }
    :where(.prose > ol > li > p:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 1.25em;
    }
    :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.75em;
      margin-bottom: 0.75em;
    }
    :where(dl):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.25em;
      margin-bottom: 1.25em;
    }
    :where(dd):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.5em;
      padding-inline-start: 1.625em;
    }
    :where(hr + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h2 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h3 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h4 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(thead th:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0;
    }
    :where(thead th:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-end: 0;
    }
    :where(tbody td, tfoot td):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-top: 0.5714286em;
      padding-inline-end: 0.5714286em;
      padding-bottom: 0.5714286em;
      padding-inline-start: 0.5714286em;
    }
    :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0;
    }
    :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-end: 0;
    }
    :where(figure):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 2em;
      margin-bottom: 2em;
    }
    :where(.prose > :first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(.prose > :last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 0;
    }
  }
  .prose-sm {
    font-size: 0.875rem;
    line-height: 1.7142857;
    :where(p):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }
    :where([class~="lead"]):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 1.2857143em;
      line-height: 1.5555556;
      margin-top: 0.8888889em;
      margin-bottom: 0.8888889em;
    }
    :where(blockquote):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.3333333em;
      margin-bottom: 1.3333333em;
      padding-inline-start: 1.1111111em;
    }
    :where(h1):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 2.1428571em;
      margin-top: 0;
      margin-bottom: 0.8em;
      line-height: 1.2;
    }
    :where(h2):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 1.4285714em;
      margin-top: 1.6em;
      margin-bottom: 0.8em;
      line-height: 1.4;
    }
    :where(h3):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 1.2857143em;
      margin-top: 1.5555556em;
      margin-bottom: 0.4444444em;
      line-height: 1.5555556;
    }
    :where(h4):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.4285714em;
      margin-bottom: 0.5714286em;
      line-height: 1.4285714;
    }
    :where(img):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }
    :where(picture):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }
    :where(picture > img):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
      margin-bottom: 0;
    }
    :where(video):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }
    :where(kbd):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8571429em;
      border-radius: 0.3125rem;
      padding-top: 0.1428571em;
      padding-inline-end: 0.3571429em;
      padding-bottom: 0.1428571em;
      padding-inline-start: 0.3571429em;
    }
    :where(code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8571429em;
    }
    :where(h2 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.9em;
    }
    :where(h3 code):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8888889em;
    }
    :where(pre):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8571429em;
      line-height: 1.6666667;
      margin-top: 1.6666667em;
      margin-bottom: 1.6666667em;
      border-radius: 0.25rem;
      padding-top: 0.6666667em;
      padding-inline-end: 1em;
      padding-bottom: 0.6666667em;
      padding-inline-start: 1em;
    }
    :where(ol):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
      padding-inline-start: 1.5714286em;
    }
    :where(ul):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
      padding-inline-start: 1.5714286em;
    }
    :where(li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.2857143em;
      margin-bottom: 0.2857143em;
    }
    :where(ol > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0.4285714em;
    }
    :where(ul > li):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0.4285714em;
    }
    :where(.prose-sm > ul > li p):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }
    :where(.prose-sm > ul > li > p:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
    }
    :where(.prose-sm > ul > li > p:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 1.1428571em;
    }
    :where(.prose-sm > ol > li > p:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
    }
    :where(.prose-sm > ol > li > p:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 1.1428571em;
    }
    :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.5714286em;
      margin-bottom: 0.5714286em;
    }
    :where(dl):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
      margin-bottom: 1.1428571em;
    }
    :where(dt):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.1428571em;
    }
    :where(dd):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0.2857143em;
      padding-inline-start: 1.5714286em;
    }
    :where(hr):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 2.8571429em;
      margin-bottom: 2.8571429em;
    }
    :where(hr + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h2 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h3 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(h4 + *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(table):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8571429em;
      line-height: 1.5;
    }
    :where(thead th):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-end: 1em;
      padding-bottom: 0.6666667em;
      padding-inline-start: 1em;
    }
    :where(thead th:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0;
    }
    :where(thead th:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-end: 0;
    }
    :where(tbody td, tfoot td):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-top: 0.6666667em;
      padding-inline-end: 1em;
      padding-bottom: 0.6666667em;
      padding-inline-start: 1em;
    }
    :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-start: 0;
    }
    :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      padding-inline-end: 0;
    }
    :where(figure):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 1.7142857em;
      margin-bottom: 1.7142857em;
    }
    :where(figure > *):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
      margin-bottom: 0;
    }
    :where(figcaption):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      font-size: 0.8571429em;
      line-height: 1.3333333;
      margin-top: 0.6666667em;
    }
    :where(.prose-sm > :first-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-top: 0;
    }
    :where(.prose-sm > :last-child):not(:where([class~="not-prose"],[class~="not-prose"] *)) {
      margin-bottom: 0;
    }
  }
  .-mt-2 {
    margin-top: calc(var(--spacing) * -2);
  }
  .mt-0\.5 {
    margin-top: calc(var(--spacing) * 0.5);
  }
  .mt-1 {
    margin-top: calc(var(--spacing) * 1);
  }
  .mt-1\.5 {
    margin-top: calc(var(--spacing) * 1.5);
  }
  .mt-2 {
    margin-top: calc(var(--spacing) * 2);
  }
  .mt-3 {
    margin-top: calc(var(--spacing) * 3);
  }
  .mt-4 {
    margin-top: calc(var(--spacing) * 4);
  }
  .mt-5 {
    margin-top: calc(var(--spacing) * 5);
  }
  .mt-6 {
    margin-top: calc(var(--spacing) * 6);
  }
  .mt-8 {
    margin-top: calc(var(--spacing) * 8);
  }
  .mt-auto {
    margin-top: auto;
  }
  .-mr-2 {
    margin-right: calc(var(--spacing) * -2);
  }
  .mr-1\.5 {
    margin-right: calc(var(--spacing) * 1.5);
  }
  .mr-2 {
    margin-right: calc(var(--spacing) * 2);
  }
  .mr-auto {
    margin-right: auto;
  }
  .mb-1 {
    margin-bottom: calc(var(--spacing) * 1);
  }
  .mb-1\.5 {
    margin-bottom: calc(var(--spacing) * 1.5);
  }
  .mb-2 {
    margin-bottom: calc(var(--spacing) * 2);
  }
  .mb-3 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  .mb-4 {
    margin-bottom: calc(var(--spacing) * 4);
  }
  .mb-5 {
    margin-bottom: calc(var(--spacing) * 5);
  }
  .mb-6 {
    margin-bottom: calc(var(--spacing) * 6);
  }
  .mb-6\! {
    margin-bottom: calc(var(--spacing) * 6) !important;
  }
  .mb-8 {
    margin-bottom: calc(var(--spacing) * 8);
  }
  .-ml-0\.75 {
    margin-left: calc(var(--spacing) * -0.75);
  }
  .ml-0\.5 {
    margin-left: calc(var(--spacing) * 0.5);
  }
  .ml-0\.75 {
    margin-left: calc(var(--spacing) * 0.75);
  }
  .ml-1 {
    margin-left: calc(var(--spacing) * 1);
  }
  .ml-1\.25 {
    margin-left: calc(var(--spacing) * 1.25);
  }
  .ml-2 {
    margin-left: calc(var(--spacing) * 2);
  }
  .ml-3 {
    margin-left: calc(var(--spacing) * 3);
  }
  .ml-auto {
    margin-left: auto;
  }
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .scrollbar-hide {
    &::-webkit-scrollbar {
      display: none;
      -webkit-appearance: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .block {
    display: block;
  }
  .contents {
    display: contents;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .table {
    display: table;
  }
  .aspect-\[0\.3\] {
    aspect-ratio: 0.3;
  }
  .aspect-\[3\] {
    aspect-ratio: 3;
  }
  .aspect-\[4\/3\] {
    aspect-ratio: 4/3;
  }
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    aspect-ratio: var(--aspect-video);
  }
  .size-1\.5 {
    width: calc(var(--spacing) * 1.5);
    height: calc(var(--spacing) * 1.5);
  }
  .size-1\.25 {
    width: calc(var(--spacing) * 1.25);
    height: calc(var(--spacing) * 1.25);
  }
  .size-2 {
    width: calc(var(--spacing) * 2);
    height: calc(var(--spacing) * 2);
  }
  .size-2\.5 {
    width: calc(var(--spacing) * 2.5);
    height: calc(var(--spacing) * 2.5);
  }
  .size-3 {
    width: calc(var(--spacing) * 3);
    height: calc(var(--spacing) * 3);
  }
  .size-3\.5 {
    width: calc(var(--spacing) * 3.5);
    height: calc(var(--spacing) * 3.5);
  }
  .size-4 {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
  .size-4\.5 {
    width: calc(var(--spacing) * 4.5);
    height: calc(var(--spacing) * 4.5);
  }
  .size-5 {
    width: calc(var(--spacing) * 5);
    height: calc(var(--spacing) * 5);
  }
  .size-6 {
    width: calc(var(--spacing) * 6);
    height: calc(var(--spacing) * 6);
  }
  .size-7 {
    width: calc(var(--spacing) * 7);
    height: calc(var(--spacing) * 7);
  }
  .size-8 {
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
  }
  .size-9 {
    width: calc(var(--spacing) * 9);
    height: calc(var(--spacing) * 9);
  }
  .size-10 {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 10);
  }
  .size-11 {
    width: calc(var(--spacing) * 11);
    height: calc(var(--spacing) * 11);
  }
  .size-12 {
    width: calc(var(--spacing) * 12);
    height: calc(var(--spacing) * 12);
  }
  .size-14 {
    width: calc(var(--spacing) * 14);
    height: calc(var(--spacing) * 14);
  }
  .size-16 {
    width: calc(var(--spacing) * 16);
    height: calc(var(--spacing) * 16);
  }
  .size-18 {
    width: calc(var(--spacing) * 18);
    height: calc(var(--spacing) * 18);
  }
  .size-20 {
    width: calc(var(--spacing) * 20);
    height: calc(var(--spacing) * 20);
  }
  .size-24 {
    width: calc(var(--spacing) * 24);
    height: calc(var(--spacing) * 24);
  }
  .size-28 {
    width: calc(var(--spacing) * 28);
    height: calc(var(--spacing) * 28);
  }
  .size-40 {
    width: calc(var(--spacing) * 40);
    height: calc(var(--spacing) * 40);
  }
  .size-\[5\.25px\] {
    width: 5.25px;
    height: 5.25px;
  }
  .size-\[6\.13px\] {
    width: 6.13px;
    height: 6.13px;
  }
  .size-\[7\.88px\] {
    width: 7.88px;
    height: 7.88px;
  }
  .size-\[7px\] {
    width: 7px;
    height: 7px;
  }
  .size-\[8\.75px\] {
    width: 8.75px;
    height: 8.75px;
  }
  .size-\[10\.5px\] {
    width: 10.5px;
    height: 10.5px;
  }
  .size-\[14px\] {
    width: 14px;
    height: 14px;
  }
  .size-full {
    width: 100%;
    height: 100%;
  }
  .size-max {
    width: max-content;
    height: max-content;
  }
  .h-1\.5 {
    height: calc(var(--spacing) * 1.5);
  }
  .h-1\/2 {
    height: calc(1/2 * 100%);
  }
  .h-2 {
    height: calc(var(--spacing) * 2);
  }
  .h-2\.5 {
    height: calc(var(--spacing) * 2.5);
  }
  .h-3 {
    height: calc(var(--spacing) * 3);
  }
  .h-4 {
    height: calc(var(--spacing) * 4);
  }
  .h-5 {
    height: calc(var(--spacing) * 5);
  }
  .h-6 {
    height: calc(var(--spacing) * 6);
  }
  .h-7 {
    height: calc(var(--spacing) * 7);
  }
  .h-8 {
    height: calc(var(--spacing) * 8);
  }
  .h-9 {
    height: calc(var(--spacing) * 9);
  }
  .h-10 {
    height: calc(var(--spacing) * 10);
  }
  .h-11 {
    height: calc(var(--spacing) * 11);
  }
  .h-14 {
    height: calc(var(--spacing) * 14);
  }
  .h-16 {
    height: calc(var(--spacing) * 16);
  }
  .h-16\.5 {
    height: calc(var(--spacing) * 16.5);
  }
  .h-18 {
    height: calc(var(--spacing) * 18);
  }
  .h-20\.5 {
    height: calc(var(--spacing) * 20.5);
  }
  .h-24 {
    height: calc(var(--spacing) * 24);
  }
  .h-24\.5 {
    height: calc(var(--spacing) * 24.5);
  }
  .h-29\.5 {
    height: calc(var(--spacing) * 29.5);
  }
  .h-30 {
    height: calc(var(--spacing) * 30);
  }
  .h-31\.5 {
    height: calc(var(--spacing) * 31.5);
  }
  .h-32 {
    height: calc(var(--spacing) * 32);
  }
  .h-34\.25 {
    height: calc(var(--spacing) * 34.25);
  }
  .h-35\.75 {
    height: calc(var(--spacing) * 35.75);
  }
  .h-37 {
    height: calc(var(--spacing) * 37);
  }
  .h-40 {
    height: calc(var(--spacing) * 40);
  }
  .h-41\.5 {
    height: calc(var(--spacing) * 41.5);
  }
  .h-41\.75 {
    height: calc(var(--spacing) * 41.75);
  }
  .h-44 {
    height: calc(var(--spacing) * 44);
  }
  .h-45\.25 {
    height: calc(var(--spacing) * 45.25);
  }
  .h-48 {
    height: calc(var(--spacing) * 48);
  }
  .h-64 {
    height: calc(var(--spacing) * 64);
  }
  .h-\[1em\] {
    height: 1em;
  }
  .h-\[30px\] {
    height: 30px;
  }
  .h-\[50vh\] {
    height: 50vh;
  }
  .h-\[60vh\] {
    height: 60vh;
  }
  .h-\[80vh\] {
    height: 80vh;
  }
  .h-\[85dvh\] {
    height: 85dvh;
  }
  .h-\[90vh\] {
    height: 90vh;
  }
  .h-\[360px\] {
    height: 360px;
  }
  .h-\[400px\] {
    height: 400px;
  }
  .h-\[500px\] {
    height: 500px;
  }
  .h-\[calc\(100dvh-360px\)\] {
    height: calc(100dvh - 360px);
  }
  .h-auto {
    height: auto;
  }
  .h-dvh {
    height: 100dvh;
  }
  .h-full {
    height: 100%;
  }
  .h-max {
    height: max-content;
  }
  .h-min {
    height: min-content;
  }
  .h-px {
    height: 1px;
  }
  .max-h-64\! {
    max-height: calc(var(--spacing) * 64) !important;
  }
  .max-h-80 {
    max-height: calc(var(--spacing) * 80);
  }
  .max-h-80\! {
    max-height: calc(var(--spacing) * 80) !important;
  }
  .max-h-100 {
    max-height: calc(var(--spacing) * 100);
  }
  .max-h-\[70vh\] {
    max-height: 70vh;
  }
  .max-h-\[85dvh\] {
    max-height: 85dvh;
  }
  .max-h-full {
    max-height: 100%;
  }
  .min-h-0 {
    min-height: calc(var(--spacing) * 0);
  }
  .min-h-4 {
    min-height: calc(var(--spacing) * 4);
  }
  .min-h-5 {
    min-height: calc(var(--spacing) * 5);
  }
  .min-h-\[40px\] {
    min-height: 40px;
  }
  .min-h-dvh {
    min-height: 100dvh;
  }
  .min-h-screen {
    min-height: 100vh;
  }
  .w-\(--trigger-width\) {
    width: var(--trigger-width);
  }
  .w-0\.5 {
    width: calc(var(--spacing) * 0.5);
  }
  .w-1\.5 {
    width: calc(var(--spacing) * 1.5);
  }
  .w-1\/2 {
    width: calc(1/2 * 100%);
  }
  .w-2 {
    width: calc(var(--spacing) * 2);
  }
  .w-2\.5 {
    width: calc(var(--spacing) * 2.5);
  }
  .w-2\/3 {
    width: calc(2/3 * 100%);
  }
  .w-4 {
    width: calc(var(--spacing) * 4);
  }
  .w-8 {
    width: calc(var(--spacing) * 8);
  }
  .w-8\.5 {
    width: calc(var(--spacing) * 8.5);
  }
  .w-9 {
    width: calc(var(--spacing) * 9);
  }
  .w-10 {
    width: calc(var(--spacing) * 10);
  }
  .w-10\/12 {
    width: calc(10/12 * 100%);
  }
  .w-11 {
    width: calc(var(--spacing) * 11);
  }
  .w-11\/12 {
    width: calc(11/12 * 100%);
  }
  .w-12 {
    width: calc(var(--spacing) * 12);
  }
  .w-14 {
    width: calc(var(--spacing) * 14);
  }
  .w-16 {
    width: calc(var(--spacing) * 16);
  }
  .w-20 {
    width: calc(var(--spacing) * 20);
  }
  .w-24 {
    width: calc(var(--spacing) * 24);
  }
  .w-28 {
    width: calc(var(--spacing) * 28);
  }
  .w-32 {
    width: calc(var(--spacing) * 32);
  }
  .w-36 {
    width: calc(var(--spacing) * 36);
  }
  .w-38 {
    width: calc(var(--spacing) * 38);
  }
  .w-40 {
    width: calc(var(--spacing) * 40);
  }
  .w-40\.25 {
    width: calc(var(--spacing) * 40.25);
  }
  .w-43 {
    width: calc(var(--spacing) * 43);
  }
  .w-45 {
    width: calc(var(--spacing) * 45);
  }
  .w-46\.25 {
    width: calc(var(--spacing) * 46.25);
  }
  .w-48 {
    width: calc(var(--spacing) * 48);
  }
  .w-55 {
    width: calc(var(--spacing) * 55);
  }
  .w-56 {
    width: calc(var(--spacing) * 56);
  }
  .w-57\.5 {
    width: calc(var(--spacing) * 57.5);
  }
  .w-62 {
    width: calc(var(--spacing) * 62);
  }
  .w-64 {
    width: calc(var(--spacing) * 64);
  }
  .w-66 {
    width: calc(var(--spacing) * 66);
  }
  .w-\[30px\] {
    width: 30px;
  }
  .w-\[200px\] {
    width: 200px;
  }
  .w-\[300px\] {
    width: 300px;
  }
  .w-\[var\(--tz-col-actions\)\] {
    width: var(--tz-col-actions);
  }
  .w-\[var\(--tz-col-area\)\] {
    width: var(--tz-col-area);
  }
  .w-\[var\(--tz-col-createPackage\)\] {
    width: var(--tz-col-createPackage);
  }
  .w-\[var\(--tz-col-index\)\] {
    width: var(--tz-col-index);
  }
  .w-\[var\(--tz-col-status\)\] {
    width: var(--tz-col-status);
  }
  .w-\[var\(--tz-col-title\)\] {
    width: var(--tz-col-title);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }
  .w-full\! {
    width: 100% !important;
  }
  .w-max {
    width: max-content;
  }
  .w-min {
    width: min-content;
  }
  .w-px {
    width: 1px;
  }
  .max-w-2xl {
    max-width: var(--container-2xl);
  }
  .max-w-3xl {
    max-width: var(--container-3xl);
  }
  .max-w-4xl {
    max-width: var(--container-4xl);
  }
  .max-w-5xl {
    max-width: var(--container-5xl);
  }
  .max-w-6xl {
    max-width: var(--container-6xl);
  }
  .max-w-7xl {
    max-width: var(--container-7xl);
  }
  .max-w-56 {
    max-width: calc(var(--spacing) * 56);
  }
  .max-w-88 {
    max-width: calc(var(--spacing) * 88);
  }
  .max-w-100 {
    max-width: calc(var(--spacing) * 100);
  }
  .max-w-\[1000px\] {
    max-width: 1000px;
  }
  .max-w-container {
    max-width: var(--max-width-container);
  }
  .max-w-full {
    max-width: 100%;
  }
  .max-w-lg {
    max-width: var(--container-lg);
  }
  .max-w-md {
    max-width: var(--container-md);
  }
  .max-w-none {
    max-width: none;
  }
  .max-w-xl {
    max-width: var(--container-xl);
  }
  .max-w-xs {
    max-width: var(--container-xs);
  }
  .min-w-0 {
    min-width: calc(var(--spacing) * 0);
  }
  .min-w-4 {
    min-width: calc(var(--spacing) * 4);
  }
  .min-w-5 {
    min-width: calc(var(--spacing) * 5);
  }
  .min-w-8 {
    min-width: calc(var(--spacing) * 8);
  }
  .min-w-56 {
    min-width: calc(var(--spacing) * 56);
  }
  .min-w-\[20\%\] {
    min-width: 20%;
  }
  .min-w-\[30\%\] {
    min-width: 30%;
  }
  .min-w-\[100px\] {
    min-width: 100px;
  }
  .min-w-\[120px\] {
    min-width: 120px;
  }
  .min-w-\[180px\] {
    min-width: 180px;
  }
  .min-w-\[200px\] {
    min-width: 200px;
  }
  .min-w-\[220px\] {
    min-width: 220px;
  }
  .min-w-\[240px\] {
    min-width: 240px;
  }
  .min-w-\[300px\] {
    min-width: 300px;
  }
  .min-w-\[820px\] {
    min-width: 820px;
  }
  .flex-1 {
    flex: 1;
  }
  .flex-\[1_0_0\] {
    flex: 1 0 0;
  }
  .shrink-0 {
    flex-shrink: 0;
  }
  .grow {
    flex-grow: 1;
  }
  .table-auto {
    table-layout: auto;
  }
  .table-fixed {
    table-layout: fixed;
  }
  .origin-\(--trigger-anchor-point\) {
    transform-origin: var(--trigger-anchor-point);
  }
  .origin-center {
    transform-origin: center;
  }
  .origin-top {
    transform-origin: top;
  }
  .-translate-x-1\/2 {
    --tw-translate-x: calc(calc(1/2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-x-4 {
    --tw-translate-x: calc(var(--spacing) * 4);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-x-5 {
    --tw-translate-x: calc(var(--spacing) * 5);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-1\/2 {
    --tw-translate-y: calc(calc(1/2 * 100%) * -1);
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-translate-y-full {
    --tw-translate-y: -100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .translate-y-full {
    --tw-translate-y: 100%;
    translate: var(--tw-translate-x) var(--tw-translate-y);
  }
  .-scale-x-100 {
    --tw-scale-x: calc(100% * -1);
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .-scale-y-100 {
    --tw-scale-y: calc(100% * -1);
    scale: var(--tw-scale-x) var(--tw-scale-y);
  }
  .-rotate-90 {
    rotate: calc(90deg * -1);
  }
  .-rotate-180 {
    rotate: calc(180deg * -1);
  }
  .rotate-0 {
    rotate: 0deg;
  }
  .rotate-90 {
    rotate: 90deg;
  }
  .rotate-180 {
    rotate: 180deg;
  }
  .transform {
    transform: var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,);
  }
  .animate-caret-blink {
    animation: var(--animate-caret-blink);
  }
  .animate-pulse {
    animation: var(--animate-pulse);
  }
  .animate-spin {
    animation: var(--animate-spin);
  }
  .cursor-auto {
    cursor: auto;
  }
  .cursor-default {
    cursor: default;
  }
  .cursor-grab {
    cursor: grab;
  }
  .cursor-grabbing {
    cursor: grabbing;
  }
  .cursor-not-allowed {
    cursor: not-allowed;
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .resize {
    resize: both;
  }
  .scroll-py-3 {
    scroll-padding-block: calc(var(--spacing) * 3);
  }
  .list-outside {
    list-style-position: outside;
  }
  .list-disc {
    list-style-type: disc;
  }
  .appearance-none {
    appearance: none;
  }
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .place-content-center {
    place-content: center;
  }
  .place-items-center {
    place-items: center;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-normal {
    justify-content: normal;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .gap-0\.5 {
    gap: calc(var(--spacing) * 0.5);
  }
  .gap-0\.75 {
    gap: calc(var(--spacing) * 0.75);
  }
  .gap-1 {
    gap: calc(var(--spacing) * 1);
  }
  .gap-1\.5 {
    gap: calc(var(--spacing) * 1.5);
  }
  .gap-1\.25 {
    gap: calc(var(--spacing) * 1.25);
  }
  .gap-2 {
    gap: calc(var(--spacing) * 2);
  }
  .gap-2\.5 {
    gap: calc(var(--spacing) * 2.5);
  }
  .gap-3 {
    gap: calc(var(--spacing) * 3);
  }
  .gap-3\.5 {
    gap: calc(var(--spacing) * 3.5);
  }
  .gap-4 {
    gap: calc(var(--spacing) * 4);
  }
  .gap-5 {
    gap: calc(var(--spacing) * 5);
  }
  .gap-6 {
    gap: calc(var(--spacing) * 6);
  }
  .gap-8 {
    gap: calc(var(--spacing) * 8);
  }
  .space-y-0\.5 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 0.5) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 0.5) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-1 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 1) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 1) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-1\.5 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 1.5) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 1.5) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-2 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 2) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 2) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-3 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 3) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 3) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-4 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 4) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 4) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .space-y-6 {
    :where(& > :not(:last-child)) {
      --tw-space-y-reverse: 0;
      margin-block-start: calc(calc(var(--spacing) * 6) * var(--tw-space-y-reverse));
      margin-block-end: calc(calc(var(--spacing) * 6) * calc(1 - var(--tw-space-y-reverse)));
    }
  }
  .gap-x-2 {
    column-gap: calc(var(--spacing) * 2);
  }
  .gap-x-6 {
    column-gap: calc(var(--spacing) * 6);
  }
  .-space-x-0\.5 {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(calc(var(--spacing) * -0.5) * var(--tw-space-x-reverse));
      margin-inline-end: calc(calc(var(--spacing) * -0.5) * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .-space-x-px {
    :where(& > :not(:last-child)) {
      --tw-space-x-reverse: 0;
      margin-inline-start: calc(-1px * var(--tw-space-x-reverse));
      margin-inline-end: calc(-1px * calc(1 - var(--tw-space-x-reverse)));
    }
  }
  .gap-y-3 {
    row-gap: calc(var(--spacing) * 3);
  }
  .divide-y {
    :where(& > :not(:last-child)) {
      --tw-divide-y-reverse: 0;
      border-bottom-style: var(--tw-border-style);
      border-top-style: var(--tw-border-style);
      border-top-width: calc(1px * var(--tw-divide-y-reverse));
      border-bottom-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
    }
  }
  .divide-secondary {
    :where(& > :not(:last-child)) {
      border-color: var(--border-color-secondary);
    }
  }
  .self-center {
    align-self: center;
  }
  .self-start {
    align-self: flex-start;
  }
  .truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }
  .overflow-visible {
    overflow: visible;
  }
  .overflow-x-auto {
    overflow-x: auto;
  }
  .overflow-x-hidden {
    overflow-x: hidden;
  }
  .overflow-x-visible {
    overflow-x: visible;
  }
  .overflow-y-auto {
    overflow-y: auto;
  }
  .overflow-y-hidden {
    overflow-y: hidden;
  }
  .overflow-y-visible {
    overflow-y: visible;
  }
  .overscroll-auto {
    overscroll-behavior: auto;
  }
  .rounded {
    border-radius: 0.25rem;
  }
  .rounded-2xl {
    border-radius: var(--radius-2xl);
  }
  .rounded-3xl {
    border-radius: var(--radius-3xl);
  }
  .rounded-\[3px\] {
    border-radius: 3px;
  }
  .rounded-\[7px\] {
    border-radius: 7px;
  }
  .rounded-\[8px\] {
    border-radius: 8px;
  }
  .rounded-\[10px\] {
    border-radius: 10px;
  }
  .rounded-\[12px\] {
    border-radius: 12px;
  }
  .rounded-\[14px\] {
    border-radius: 14px;
  }
  .rounded-\[inherit\] {
    border-radius: inherit;
  }
  .rounded-full {
    border-radius: var(--radius-full);
  }
  .rounded-lg {
    border-radius: var(--radius-lg);
  }
  .rounded-md {
    border-radius: var(--radius-md);
  }
  .rounded-none {
    border-radius: var(--radius-none);
  }
  .rounded-none\! {
    border-radius: var(--radius-none) !important;
  }
  .rounded-sm {
    border-radius: var(--radius-sm);
  }
  .rounded-xl {
    border-radius: var(--radius-xl);
  }
  .rounded-xs {
    border-radius: var(--radius-xs);
  }
  .rounded-t-full {
    border-top-left-radius: var(--radius-full);
    border-top-right-radius: var(--radius-full);
  }
  .rounded-l-full {
    border-top-left-radius: var(--radius-full);
    border-bottom-left-radius: var(--radius-full);
  }
  .rounded-l-none {
    border-top-left-radius: var(--radius-none);
    border-bottom-left-radius: var(--radius-none);
  }
  .rounded-tl {
    border-top-left-radius: 0.25rem;
  }
  .rounded-r-\[inherit\] {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  .rounded-r-full {
    border-top-right-radius: var(--radius-full);
    border-bottom-right-radius: var(--radius-full);
  }
  .rounded-r-none {
    border-top-right-radius: var(--radius-none);
    border-bottom-right-radius: var(--radius-none);
  }
  .rounded-b-full {
    border-bottom-right-radius: var(--radius-full);
    border-bottom-left-radius: var(--radius-full);
  }
  .border {
    border-style: var(--tw-border-style);
    border-width: 1px;
  }
  .border-4 {
    border-style: var(--tw-border-style);
    border-width: 4px;
  }
  .border-t {
    border-top-style: var(--tw-border-style);
    border-top-width: 1px;
  }
  .border-t-2 {
    border-top-style: var(--tw-border-style);
    border-top-width: 2px;
  }
  .border-r {
    border-right-style: var(--tw-border-style);
    border-right-width: 1px;
  }
  .border-r-\[1\.5px\] {
    border-right-style: var(--tw-border-style);
    border-right-width: 1.5px;
  }
  .border-b {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 1px;
  }
  .border-b-2 {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 2px;
  }
  .border-b-4 {
    border-bottom-style: var(--tw-border-style);
    border-bottom-width: 4px;
  }
  .border-l {
    border-left-style: var(--tw-border-style);
    border-left-width: 1px;
  }
  .border-l-2 {
    border-left-style: var(--tw-border-style);
    border-left-width: 2px;
  }
  .border-dashed {
    --tw-border-style: dashed;
    border-style: dashed;
  }
  .border-none {
    --tw-border-style: none;
    border-style: none;
  }
  .border-solid {
    --tw-border-style: solid;
    border-style: solid;
  }
  .border-border-secondary {
    border-color: var(--color-border-secondary);
  }
  .border-brand {
    border-color: var(--border-color-brand);
  }
  .border-brand_alt {
    border-color: var(--border-color-brand_alt);
  }
  .border-disabled {
    border-color: var(--border-color-disabled);
  }
  .border-fg-brand-primary_alt {
    border-color: var(--color-fg-brand-primary_alt);
  }
  .border-gray-100 {
    border-color: var(--color-gray-100);
  }
  .border-gray-200 {
    border-color: var(--color-gray-200);
  }
  .border-gray-300 {
    border-color: var(--color-gray-300);
  }
  .border-primary {
    border-color: var(--border-color-primary);
  }
  .border-secondary {
    border-color: var(--border-color-secondary);
  }
  .border-toggle-border {
    border-color: var(--color-toggle-border);
  }
  .border-toggle-slim-border_pressed {
    border-color: var(--color-toggle-slim-border_pressed);
  }
  .border-toggle-slim-border_pressed-hover {
    border-color: var(--color-toggle-slim-border_pressed-hover);
  }
  .border-transparent {
    border-color: transparent;
  }
  .border-t-primary {
    border-top-color: var(--border-color-primary);
  }
  .bg-\[\#1877F2\] {
    background-color: #1877F2;
  }
  .bg-\[\#EA4C89\] {
    background-color: #EA4C89;
  }
  .bg-\[var\(--color-bg-primary\)\] {
    background-color: var(--color-bg-primary);
  }
  .bg-active {
    background-color: var(--background-color-active);
  }
  .bg-alpha-black\/20 {
    background-color: color-mix(in srgb, rgb(0 0 0) 20%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-alpha-black) 20%, transparent);
    }
  }
  .bg-alpha-white\/90 {
    background-color: color-mix(in srgb, rgb(255 255 255) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-alpha-white) 90%, transparent);
    }
  }
  .bg-amber-900 {
    background-color: var(--color-amber-900);
  }
  .bg-avatar-bg {
    background-color: var(--color-avatar-bg);
  }
  .bg-black {
    background-color: var(--color-black);
  }
  .bg-black\/0 {
    background-color: color-mix(in srgb, rgb(0 0 0) 0%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 0%, transparent);
    }
  }
  .bg-black\/50 {
    background-color: color-mix(in srgb, rgb(0 0 0) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-black) 50%, transparent);
    }
  }
  .bg-blue-500 {
    background-color: var(--color-blue-500);
  }
  .bg-blue-900 {
    background-color: var(--color-blue-900);
  }
  .bg-border-primary {
    background-color: var(--color-border-primary);
  }
  .bg-border-secondary {
    background-color: var(--color-border-secondary);
  }
  .bg-brand-primary_alt {
    background-color: var(--background-color-brand-primary_alt);
  }
  .bg-brand-secondary {
    background-color: var(--background-color-brand-secondary);
  }
  .bg-brand-solid {
    background-color: var(--background-color-brand-solid);
  }
  .bg-brand-solid\/10 {
    background-color: color-mix(in srgb, rgb(21 112 239) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-brand-solid) 10%, transparent);
    }
  }
  .bg-brand-solid_hover {
    background-color: var(--background-color-brand-solid_hover);
  }
  .bg-disabled {
    background-color: var(--background-color-disabled);
  }
  .bg-disabled_subtle {
    background-color: var(--background-color-disabled_subtle);
  }
  .bg-emerald-50 {
    background-color: var(--color-emerald-50);
  }
  .bg-error-secondary {
    background-color: var(--background-color-error-secondary);
  }
  .bg-error-solid {
    background-color: var(--background-color-error-solid);
  }
  .bg-fg-brand-primary {
    background-color: var(--color-fg-brand-primary);
  }
  .bg-fg-brand-primary_alt {
    background-color: var(--color-fg-brand-primary_alt);
  }
  .bg-fg-brand-secondary {
    background-color: var(--color-fg-brand-secondary);
  }
  .bg-fg-disabled {
    background-color: var(--color-fg-disabled);
  }
  .bg-fg-disabled_subtle {
    background-color: var(--color-fg-disabled_subtle);
  }
  .bg-fg-success-secondary {
    background-color: var(--color-fg-success-secondary);
  }
  .bg-fg-white {
    background-color: var(--color-fg-white);
  }
  .bg-gray-50 {
    background-color: var(--color-gray-50);
  }
  .bg-gray-100 {
    background-color: var(--color-gray-100);
  }
  .bg-lime-50 {
    background-color: var(--color-lime-50);
  }
  .bg-orange-50 {
    background-color: var(--color-orange-50);
  }
  .bg-overlay\/70 {
    background-color: color-mix(in srgb, rgb(10 13 18) 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-overlay) 70%, transparent);
    }
  }
  .bg-pink-50 {
    background-color: var(--color-pink-50);
  }
  .bg-pink-100 {
    background-color: var(--color-pink-100);
  }
  .bg-primary {
    background-color: var(--background-color-primary);
  }
  .bg-primary-solid {
    background-color: var(--background-color-primary-solid);
  }
  .bg-primary\/80 {
    background-color: color-mix(in srgb, rgb(255 255 255) 80%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-primary) 80%, transparent);
    }
  }
  .bg-primary_alt {
    background-color: var(--background-color-primary_alt);
  }
  .bg-primary_hover {
    background-color: var(--background-color-primary_hover);
  }
  .bg-quaternary {
    background-color: var(--background-color-quaternary);
  }
  .bg-red-50 {
    background-color: var(--color-red-50);
  }
  .bg-red-500 {
    background-color: var(--color-red-500);
  }
  .bg-secondary {
    background-color: var(--background-color-secondary);
  }
  .bg-secondary-solid {
    background-color: var(--background-color-secondary-solid);
  }
  .bg-secondary\/10 {
    background-color: color-mix(in srgb, rgb(250 250 250) 10%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-secondary) 10%, transparent);
    }
  }
  .bg-secondary\/30 {
    background-color: color-mix(in srgb, rgb(250 250 250) 30%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-secondary) 30%, transparent);
    }
  }
  .bg-secondary\/50 {
    background-color: color-mix(in srgb, rgb(250 250 250) 50%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--background-color-secondary) 50%, transparent);
    }
  }
  .bg-secondary_alt {
    background-color: var(--background-color-secondary_alt);
  }
  .bg-sky-50 {
    background-color: var(--color-sky-50);
  }
  .bg-slider-handle-bg {
    background-color: var(--color-slider-handle-bg);
  }
  .bg-success-secondary {
    background-color: var(--background-color-success-secondary);
  }
  .bg-success-solid {
    background-color: var(--background-color-success-solid);
  }
  .bg-tertiary {
    background-color: var(--background-color-tertiary);
  }
  .bg-toggle-button-fg_disabled {
    background-color: var(--color-toggle-button-fg_disabled);
  }
  .bg-transparent {
    background-color: transparent;
  }
  .bg-utility-blue-50 {
    background-color: var(--color-utility-blue-50);
  }
  .bg-utility-blue-light-50 {
    background-color: var(--color-utility-blue-light-50);
  }
  .bg-utility-brand-50 {
    background-color: var(--color-utility-brand-50);
  }
  .bg-utility-brand-500 {
    background-color: var(--color-utility-brand-500);
  }
  .bg-utility-error-50 {
    background-color: var(--color-utility-error-50);
  }
  .bg-utility-error-500 {
    background-color: var(--color-utility-error-500);
  }
  .bg-utility-gray-50 {
    background-color: var(--color-utility-gray-50);
  }
  .bg-utility-gray-500 {
    background-color: var(--color-utility-gray-500);
  }
  .bg-utility-gray-blue-50 {
    background-color: var(--color-utility-gray-blue-50);
  }
  .bg-utility-indigo-50 {
    background-color: var(--color-utility-indigo-50);
  }
  .bg-utility-orange-50 {
    background-color: var(--color-utility-orange-50);
  }
  .bg-utility-pink-50 {
    background-color: var(--color-utility-pink-50);
  }
  .bg-utility-purple-50 {
    background-color: var(--color-utility-purple-50);
  }
  .bg-utility-success-50 {
    background-color: var(--color-utility-success-50);
  }
  .bg-utility-success-500 {
    background-color: var(--color-utility-success-500);
  }
  .bg-utility-warning-50 {
    background-color: var(--color-utility-warning-50);
  }
  .bg-utility-warning-500 {
    background-color: var(--color-utility-warning-500);
  }
  .bg-warning-secondary {
    background-color: var(--background-color-warning-secondary);
  }
  .bg-warning-solid {
    background-color: var(--background-color-warning-solid);
  }
  .bg-white {
    background-color: var(--color-white);
  }
  .bg-white\/70 {
    background-color: color-mix(in srgb, rgb(255 255 255) 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 70%, transparent);
    }
  }
  .bg-white\/90 {
    background-color: color-mix(in srgb, rgb(255 255 255) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      background-color: color-mix(in oklab, var(--color-white) 90%, transparent);
    }
  }
  .bg-linear-to-b {
    --tw-gradient-position: to bottom;
    @supports (background-image: linear-gradient(in lab, red, red)) {
      --tw-gradient-position: to bottom in oklab;
    }
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .bg-linear-to-r {
    --tw-gradient-position: to right;
    @supports (background-image: linear-gradient(in lab, red, red)) {
      --tw-gradient-position: to right in oklab;
    }
    background-image: linear-gradient(var(--tw-gradient-stops));
  }
  .from-gray-50 {
    --tw-gradient-from: var(--color-gray-50);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .from-transparent {
    --tw-gradient-from: transparent;
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-\[var\(--color-bg-primary\)\] {
    --tw-gradient-to: var(--color-bg-primary);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-bg-disabled_subtle {
    --tw-gradient-to: var(--color-bg-disabled_subtle);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-bg-primary {
    --tw-gradient-to: var(--color-bg-primary);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-gray-200 {
    --tw-gradient-to: var(--color-gray-200);
    --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
  }
  .to-40\% {
    --tw-gradient-to-position: 40%;
  }
  .fill-bg-primary-solid {
    fill: var(--color-bg-primary-solid);
  }
  .fill-bg-secondary {
    fill: var(--color-bg-secondary);
  }
  .fill-bg-tertiary {
    fill: var(--color-bg-tertiary);
  }
  .fill-border-secondary_alt {
    fill: var(--color-border-secondary_alt);
  }
  .fill-current {
    fill: currentcolor;
  }
  .fill-fg-primary {
    fill: var(--color-fg-primary);
  }
  .fill-utility-gray-50 {
    fill: var(--color-utility-gray-50);
  }
  .fill-utility-gray-100 {
    fill: var(--color-utility-gray-100);
  }
  .fill-utility-gray-200 {
    fill: var(--color-utility-gray-200);
  }
  .fill-utility-gray-300 {
    fill: var(--color-utility-gray-300);
  }
  .stroke-bg-quaternary {
    stroke: var(--color-bg-quaternary);
  }
  .stroke-border-secondary {
    stroke: var(--color-border-secondary);
  }
  .stroke-border-secondary_alt {
    stroke: var(--color-border-secondary_alt);
  }
  .stroke-current {
    stroke: currentcolor;
  }
  .stroke-fg-brand-primary {
    stroke: var(--color-fg-brand-primary);
  }
  .stroke-inherit {
    stroke: inherit;
  }
  .stroke-3 {
    stroke-width: 3;
  }
  .stroke-\[2\.3px\] {
    stroke-width: 2.3px;
  }
  .stroke-\[2\.5px\] {
    stroke-width: 2.5px;
  }
  .stroke-\[2\.25px\] {
    stroke-width: 2.25px;
  }
  .stroke-\[2\.625px\] {
    stroke-width: 2.625px;
  }
  .stroke-\[3px\] {
    stroke-width: 3px;
  }
  .object-contain {
    object-fit: contain;
  }
  .object-cover {
    object-fit: cover;
  }
  .p-0 {
    padding: calc(var(--spacing) * 0);
  }
  .p-0\! {
    padding: calc(var(--spacing) * 0) !important;
  }
  .p-0\.5 {
    padding: calc(var(--spacing) * 0.5);
  }
  .p-0\.75 {
    padding: calc(var(--spacing) * 0.75);
  }
  .p-1 {
    padding: calc(var(--spacing) * 1);
  }
  .p-1\.5 {
    padding: calc(var(--spacing) * 1.5);
  }
  .p-1\.5\! {
    padding: calc(var(--spacing) * 1.5) !important;
  }
  .p-1\.25 {
    padding: calc(var(--spacing) * 1.25);
  }
  .p-1\.75 {
    padding: calc(var(--spacing) * 1.75);
  }
  .p-2 {
    padding: calc(var(--spacing) * 2);
  }
  .p-2\.5 {
    padding: calc(var(--spacing) * 2.5);
  }
  .p-3 {
    padding: calc(var(--spacing) * 3);
  }
  .p-4 {
    padding: calc(var(--spacing) * 4);
  }
  .p-5 {
    padding: calc(var(--spacing) * 5);
  }
  .p-6 {
    padding: calc(var(--spacing) * 6);
  }
  .p-8 {
    padding: calc(var(--spacing) * 8);
  }
  .p-10 {
    padding: calc(var(--spacing) * 10);
  }
  .px-0\.5 {
    padding-inline: calc(var(--spacing) * 0.5);
  }
  .px-1 {
    padding-inline: calc(var(--spacing) * 1);
  }
  .px-1\.5 {
    padding-inline: calc(var(--spacing) * 1.5);
  }
  .px-1\.25 {
    padding-inline: calc(var(--spacing) * 1.25);
  }
  .px-2 {
    padding-inline: calc(var(--spacing) * 2);
  }
  .px-2\.5 {
    padding-inline: calc(var(--spacing) * 2.5);
  }
  .px-2\.25 {
    padding-inline: calc(var(--spacing) * 2.25);
  }
  .px-3 {
    padding-inline: calc(var(--spacing) * 3);
  }
  .px-3\.5 {
    padding-inline: calc(var(--spacing) * 3.5);
  }
  .px-4 {
    padding-inline: calc(var(--spacing) * 4);
  }
  .px-4\.5 {
    padding-inline: calc(var(--spacing) * 4.5);
  }
  .px-5 {
    padding-inline: calc(var(--spacing) * 5);
  }
  .px-5\.5 {
    padding-inline: calc(var(--spacing) * 5.5);
  }
  .px-6 {
    padding-inline: calc(var(--spacing) * 6);
  }
  .px-8 {
    padding-inline: calc(var(--spacing) * 8);
  }
  .py-0\.5 {
    padding-block: calc(var(--spacing) * 0.5);
  }
  .py-0\.75 {
    padding-block: calc(var(--spacing) * 0.75);
  }
  .py-1 {
    padding-block: calc(var(--spacing) * 1);
  }
  .py-1\.5 {
    padding-block: calc(var(--spacing) * 1.5);
  }
  .py-2 {
    padding-block: calc(var(--spacing) * 2);
  }
  .py-2\.5 {
    padding-block: calc(var(--spacing) * 2.5);
  }
  .py-3 {
    padding-block: calc(var(--spacing) * 3);
  }
  .py-4 {
    padding-block: calc(var(--spacing) * 4);
  }
  .py-5 {
    padding-block: calc(var(--spacing) * 5);
  }
  .py-6 {
    padding-block: calc(var(--spacing) * 6);
  }
  .py-8 {
    padding-block: calc(var(--spacing) * 8);
  }
  .py-10 {
    padding-block: calc(var(--spacing) * 10);
  }
  .py-12 {
    padding-block: calc(var(--spacing) * 12);
  }
  .py-16 {
    padding-block: calc(var(--spacing) * 16);
  }
  .py-px {
    padding-block: 1px;
  }
  .pt-0 {
    padding-top: calc(var(--spacing) * 0);
  }
  .pt-0\.5 {
    padding-top: calc(var(--spacing) * 0.5);
  }
  .pt-1 {
    padding-top: calc(var(--spacing) * 1);
  }
  .pt-1\.5 {
    padding-top: calc(var(--spacing) * 1.5);
  }
  .pt-2 {
    padding-top: calc(var(--spacing) * 2);
  }
  .pt-3 {
    padding-top: calc(var(--spacing) * 3);
  }
  .pt-4 {
    padding-top: calc(var(--spacing) * 4);
  }
  .pt-5 {
    padding-top: calc(var(--spacing) * 5);
  }
  .pt-6 {
    padding-top: calc(var(--spacing) * 6);
  }
  .pr-0 {
    padding-right: calc(var(--spacing) * 0);
  }
  .pr-0\.75 {
    padding-right: calc(var(--spacing) * 0.75);
  }
  .pr-1 {
    padding-right: calc(var(--spacing) * 1);
  }
  .pr-1\.5 {
    padding-right: calc(var(--spacing) * 1.5);
  }
  .pr-2 {
    padding-right: calc(var(--spacing) * 2);
  }
  .pr-2\.5 {
    padding-right: calc(var(--spacing) * 2.5);
  }
  .pr-3 {
    padding-right: calc(var(--spacing) * 3);
  }
  .pr-3\.5 {
    padding-right: calc(var(--spacing) * 3.5);
  }
  .pr-4 {
    padding-right: calc(var(--spacing) * 4);
  }
  .pr-8 {
    padding-right: calc(var(--spacing) * 8);
  }
  .pr-9 {
    padding-right: calc(var(--spacing) * 9);
  }
  .pr-9\.5 {
    padding-right: calc(var(--spacing) * 9.5);
  }
  .pr-16 {
    padding-right: calc(var(--spacing) * 16);
  }
  .pb-1 {
    padding-bottom: calc(var(--spacing) * 1);
  }
  .pb-1\.5 {
    padding-bottom: calc(var(--spacing) * 1.5);
  }
  .pb-2 {
    padding-bottom: calc(var(--spacing) * 2);
  }
  .pb-2\.5 {
    padding-bottom: calc(var(--spacing) * 2.5);
  }
  .pb-3 {
    padding-bottom: calc(var(--spacing) * 3);
  }
  .pb-4 {
    padding-bottom: calc(var(--spacing) * 4);
  }
  .pb-5 {
    padding-bottom: calc(var(--spacing) * 5);
  }
  .pb-6 {
    padding-bottom: calc(var(--spacing) * 6);
  }
  .pb-8 {
    padding-bottom: calc(var(--spacing) * 8);
  }
  .pb-12 {
    padding-bottom: calc(var(--spacing) * 12);
  }
  .pb-\[clamp\(16px\,8vh\,64px\)\] {
    padding-bottom: clamp(16px, 8vh, 64px);
  }
  .\!pl-3 {
    padding-left: calc(var(--spacing) * 3) !important;
  }
  .pl-0\.75 {
    padding-left: calc(var(--spacing) * 0.75);
  }
  .pl-1 {
    padding-left: calc(var(--spacing) * 1);
  }
  .pl-1\.5 {
    padding-left: calc(var(--spacing) * 1.5);
  }
  .pl-1\.25 {
    padding-left: calc(var(--spacing) * 1.25);
  }
  .pl-1\.75 {
    padding-left: calc(var(--spacing) * 1.75);
  }
  .pl-2 {
    padding-left: calc(var(--spacing) * 2);
  }
  .pl-2\.5 {
    padding-left: calc(var(--spacing) * 2.5);
  }
  .pl-2\.25 {
    padding-left: calc(var(--spacing) * 2.25);
  }
  .pl-3 {
    padding-left: calc(var(--spacing) * 3);
  }
  .pl-3\.5 {
    padding-left: calc(var(--spacing) * 3.5);
  }
  .pl-4 {
    padding-left: calc(var(--spacing) * 4);
  }
  .pl-5 {
    padding-left: calc(var(--spacing) * 5);
  }
  .pl-6 {
    padding-left: calc(var(--spacing) * 6);
  }
  .pl-8 {
    padding-left: calc(var(--spacing) * 8);
  }
  .pl-10 {
    padding-left: calc(var(--spacing) * 10);
  }
  .pl-10\.5 {
    padding-left: calc(var(--spacing) * 10.5);
  }
  .pl-13 {
    padding-left: calc(var(--spacing) * 13);
  }
  .text-center {
    text-align: center;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  .align-middle {
    vertical-align: middle;
  }
  .font-body {
    font-family: var(--font-body);
  }
  .font-mono {
    font-family: var(--font-mono);
  }
  .text-display-lg {
    font-size: var(--text-display-lg);
    line-height: var(--tw-leading, var(--text-display-lg--line-height));
    letter-spacing: var(--tw-tracking, var(--text-display-lg--letter-spacing));
  }
  .text-display-md {
    font-size: var(--text-display-md);
    line-height: var(--tw-leading, var(--text-display-md--line-height));
    letter-spacing: var(--tw-tracking, var(--text-display-md--letter-spacing));
  }
  .text-display-xl {
    font-size: var(--text-display-xl);
    line-height: var(--tw-leading, var(--text-display-xl--line-height));
    letter-spacing: var(--tw-tracking, var(--text-display-xl--letter-spacing));
  }
  .text-2xl {
    font-size: var(--text-2xl);
    line-height: var(--tw-leading, var(--text-2xl--line-height));
  }
  .text-4xl {
    font-size: var(--text-4xl);
    line-height: var(--tw-leading, var(--text-4xl--line-height));
  }
  .text-base {
    font-size: var(--text-base);
    line-height: var(--tw-leading, var(--text-base--line-height));
  }
  .text-display-sm {
    font-size: var(--text-display-sm);
    line-height: var(--tw-leading, var(--text-display-sm--line-height));
  }
  .text-display-xs {
    font-size: var(--text-display-xs);
    line-height: var(--tw-leading, var(--text-display-xs--line-height));
  }
  .text-lg {
    font-size: var(--text-lg);
    line-height: var(--tw-leading, var(--text-lg--line-height));
  }
  .text-md {
    font-size: var(--text-md);
    line-height: var(--tw-leading, var(--text-md--line-height));
  }
  .text-sm {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
  }
  .text-xl {
    font-size: var(--text-xl);
    line-height: var(--tw-leading, var(--text-xl--line-height));
  }
  .text-xs {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
  }
  .leading-none {
    --tw-leading: 1;
    line-height: 1;
  }
  .font-bold {
    --tw-font-weight: var(--font-weight-bold);
    font-weight: var(--font-weight-bold);
  }
  .font-extrabold {
    --tw-font-weight: var(--font-weight-extrabold);
    font-weight: var(--font-weight-extrabold);
  }
  .font-medium {
    --tw-font-weight: var(--font-weight-medium);
    font-weight: var(--font-weight-medium);
  }
  .font-normal {
    --tw-font-weight: var(--font-weight-normal);
    font-weight: var(--font-weight-normal);
  }
  .font-semibold {
    --tw-font-weight: var(--font-weight-semibold);
    font-weight: var(--font-weight-semibold);
  }
  .tracking-\[0\.3em\] {
    --tw-tracking: 0.3em;
    letter-spacing: 0.3em;
  }
  .tracking-tight {
    --tw-tracking: var(--tracking-tight);
    letter-spacing: var(--tracking-tight);
  }
  .tracking-wide {
    --tw-tracking: var(--tracking-wide);
    letter-spacing: var(--tracking-wide);
  }
  .break-words {
    overflow-wrap: break-word;
  }
  .text-ellipsis {
    text-overflow: ellipsis;
  }
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .text-alpha-black {
    color: var(--color-alpha-black);
  }
  .text-bg-tertiary {
    color: var(--color-bg-tertiary);
  }
  .text-black {
    color: var(--color-black);
  }
  .text-blue-500 {
    color: var(--color-blue-500);
  }
  .text-blue-700 {
    color: var(--color-blue-700);
  }
  .text-blue-800 {
    color: var(--color-blue-800);
  }
  .text-border-secondary {
    color: var(--color-border-secondary);
  }
  .text-brand-600 {
    color: var(--color-brand-600);
  }
  .text-brand-secondary {
    color: var(--text-color-brand-secondary);
  }
  .text-brand-tertiary {
    color: var(--text-color-brand-tertiary);
  }
  .text-brand-tertiary_alt {
    color: var(--text-color-brand-tertiary_alt);
  }
  .text-current {
    color: currentcolor;
  }
  .text-disabled {
    color: var(--text-color-disabled);
  }
  .text-emerald-700 {
    color: var(--color-emerald-700);
  }
  .text-error-primary {
    color: var(--text-color-error-primary);
  }
  .text-featured-icon-light-fg-brand {
    color: var(--color-featured-icon-light-fg-brand);
  }
  .text-featured-icon-light-fg-error {
    color: var(--color-featured-icon-light-fg-error);
  }
  .text-featured-icon-light-fg-gray {
    color: var(--color-featured-icon-light-fg-gray);
  }
  .text-featured-icon-light-fg-success {
    color: var(--color-featured-icon-light-fg-success);
  }
  .text-featured-icon-light-fg-warning {
    color: var(--color-featured-icon-light-fg-warning);
  }
  .text-fg-brand-primary {
    color: var(--color-fg-brand-primary);
  }
  .text-fg-disabled {
    color: var(--color-fg-disabled);
  }
  .text-fg-disabled_subtle {
    color: var(--color-fg-disabled_subtle);
  }
  .text-fg-error-primary {
    color: var(--color-fg-error-primary);
  }
  .text-fg-error-secondary {
    color: var(--color-fg-error-secondary);
  }
  .text-fg-primary {
    color: var(--color-fg-primary);
  }
  .text-fg-quaternary {
    color: var(--color-fg-quaternary);
  }
  .text-fg-quaternary_hover {
    color: var(--color-fg-quaternary_hover);
  }
  .text-fg-secondary {
    color: var(--color-fg-secondary);
  }
  .text-fg-success-primary {
    color: var(--color-fg-success-primary);
  }
  .text-fg-success-secondary {
    color: var(--color-fg-success-secondary);
  }
  .text-fg-tertiary {
    color: var(--color-fg-tertiary);
  }
  .text-fg-warning-primary {
    color: var(--color-fg-warning-primary);
  }
  .text-fg-white {
    color: var(--color-fg-white);
  }
  .text-fg-white\/70 {
    color: color-mix(in srgb, rgb(255 255 255) 70%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      color: color-mix(in oklab, var(--color-fg-white) 70%, transparent);
    }
  }
  .text-gray-400 {
    color: var(--color-gray-400);
  }
  .text-gray-500 {
    color: var(--color-gray-500);
  }
  .text-gray-600 {
    color: var(--color-gray-600);
  }
  .text-gray-700 {
    color: var(--color-gray-700);
  }
  .text-gray-900 {
    color: var(--color-gray-900);
  }
  .text-inherit {
    color: inherit;
  }
  .text-lime-700 {
    color: var(--color-lime-700);
  }
  .text-orange-600 {
    color: var(--color-orange-600);
  }
  .text-pink-700 {
    color: var(--color-pink-700);
  }
  .text-placeholder {
    color: var(--text-color-placeholder);
  }
  .text-placeholder_subtle {
    color: var(--text-color-placeholder_subtle);
  }
  .text-primary {
    color: var(--text-color-primary);
  }
  .text-primary_on-brand {
    color: var(--text-color-primary_on-brand);
  }
  .text-quaternary {
    color: var(--text-color-quaternary);
  }
  .text-red-500 {
    color: var(--color-red-500);
  }
  .text-red-600 {
    color: var(--color-red-600);
  }
  .text-secondary {
    color: var(--text-color-secondary);
  }
  .text-secondary_hover {
    color: var(--text-color-secondary_hover);
  }
  .text-secondary_on-brand {
    color: var(--text-color-secondary_on-brand);
  }
  .text-sky-700 {
    color: var(--color-sky-700);
  }
  .text-success-primary {
    color: var(--text-color-success-primary);
  }
  .text-tertiary {
    color: var(--text-color-tertiary);
  }
  .text-tooltip-supporting-text {
    color: var(--text-color-tooltip-supporting-text);
  }
  .text-transparent {
    color: transparent;
  }
  .text-utility-blue-400 {
    color: var(--color-utility-blue-400);
  }
  .text-utility-blue-500 {
    color: var(--color-utility-blue-500);
  }
  .text-utility-blue-700 {
    color: var(--color-utility-blue-700);
  }
  .text-utility-blue-light-400 {
    color: var(--color-utility-blue-light-400);
  }
  .text-utility-blue-light-500 {
    color: var(--color-utility-blue-light-500);
  }
  .text-utility-blue-light-700 {
    color: var(--color-utility-blue-light-700);
  }
  .text-utility-brand-400 {
    color: var(--color-utility-brand-400);
  }
  .text-utility-brand-500 {
    color: var(--color-utility-brand-500);
  }
  .text-utility-brand-700 {
    color: var(--color-utility-brand-700);
  }
  .text-utility-error-400 {
    color: var(--color-utility-error-400);
  }
  .text-utility-error-500 {
    color: var(--color-utility-error-500);
  }
  .text-utility-error-700 {
    color: var(--color-utility-error-700);
  }
  .text-utility-gray-50 {
    color: var(--color-utility-gray-50);
  }
  .text-utility-gray-100 {
    color: var(--color-utility-gray-100);
  }
  .text-utility-gray-200 {
    color: var(--color-utility-gray-200);
  }
  .text-utility-gray-400 {
    color: var(--color-utility-gray-400);
  }
  .text-utility-gray-500 {
    color: var(--color-utility-gray-500);
  }
  .text-utility-gray-700 {
    color: var(--color-utility-gray-700);
  }
  .text-utility-gray-blue-400 {
    color: var(--color-utility-gray-blue-400);
  }
  .text-utility-gray-blue-500 {
    color: var(--color-utility-gray-blue-500);
  }
  .text-utility-gray-blue-700 {
    color: var(--color-utility-gray-blue-700);
  }
  .text-utility-indigo-400 {
    color: var(--color-utility-indigo-400);
  }
  .text-utility-indigo-500 {
    color: var(--color-utility-indigo-500);
  }
  .text-utility-indigo-700 {
    color: var(--color-utility-indigo-700);
  }
  .text-utility-orange-400 {
    color: var(--color-utility-orange-400);
  }
  .text-utility-orange-500 {
    color: var(--color-utility-orange-500);
  }
  .text-utility-orange-700 {
    color: var(--color-utility-orange-700);
  }
  .text-utility-pink-400 {
    color: var(--color-utility-pink-400);
  }
  .text-utility-pink-500 {
    color: var(--color-utility-pink-500);
  }
  .text-utility-pink-700 {
    color: var(--color-utility-pink-700);
  }
  .text-utility-purple-400 {
    color: var(--color-utility-purple-400);
  }
  .text-utility-purple-500 {
    color: var(--color-utility-purple-500);
  }
  .text-utility-purple-700 {
    color: var(--color-utility-purple-700);
  }
  .text-utility-success-400 {
    color: var(--color-utility-success-400);
  }
  .text-utility-success-500 {
    color: var(--color-utility-success-500);
  }
  .text-utility-success-700 {
    color: var(--color-utility-success-700);
  }
  .text-utility-warning-400 {
    color: var(--color-utility-warning-400);
  }
  .text-utility-warning-500 {
    color: var(--color-utility-warning-500);
  }
  .text-utility-warning-700 {
    color: var(--color-utility-warning-700);
  }
  .text-warning-400 {
    color: var(--color-warning-400);
  }
  .text-warning-primary {
    color: var(--text-color-warning-primary);
  }
  .text-white {
    color: var(--color-white);
  }
  .uppercase {
    text-transform: uppercase;
  }
  .italic {
    font-style: italic;
  }
  .tabular-nums {
    --tw-numeric-spacing: tabular-nums;
    font-variant-numeric: var(--tw-ordinal,) var(--tw-slashed-zero,) var(--tw-numeric-figure,) var(--tw-numeric-spacing,) var(--tw-numeric-fraction,);
  }
  .underline {
    text-decoration-line: underline;
  }
  .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .caret-alpha-black\/90 {
    caret-color: color-mix(in srgb, rgb(0 0 0) 90%, transparent);
    @supports (color: color-mix(in lab, red, red)) {
      caret-color: color-mix(in oklab, var(--color-alpha-black) 90%, transparent);
    }
  }
  .caret-transparent {
    caret-color: transparent;
  }
  .opacity-0 {
    opacity: 0%;
  }
  .opacity-30 {
    opacity: 30%;
  }
  .opacity-50 {
    opacity: 50%;
  }
  .opacity-100 {
    opacity: 100%;
  }
  .shadow-2xl {
    --tw-shadow: 0px 24px 48px -12px var(--tw-shadow-color, rgba(10, 13, 18, 0.18)), 0px 4px 4px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.04));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-\[inset_0px_1px_0px_0px\] {
    --tw-shadow: inset 0px 1px 0px 0px var(--tw-shadow-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-lg {
    --tw-shadow: 0px 12px 16px -4px var(--tw-shadow-color, rgba(10, 13, 18, 0.08)), 0px 4px 6px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.03)), 0px 2px 2px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.04));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-md {
    --tw-shadow: 0px 4px 6px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.1)), 0px 2px 4px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.06));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-skeumorphic {
    --tw-shadow: 0px 0px 0px 1px var(--tw-shadow-color, rgba(10, 13, 18, 0.18)) inset, 0px -2px 0px 0px var(--tw-shadow-color, rgba(10, 13, 18, 0.05)) inset;
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-sm {
    --tw-shadow: 0px 1px 3px var(--tw-shadow-color, rgba(10, 13, 18, 0.1)), 0px 1px 2px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xl {
    --tw-shadow: 0px 20px 24px -4px var(--tw-shadow-color, rgba(10, 13, 18, 0.08)), 0px 8px 8px -4px var(--tw-shadow-color, rgba(10, 13, 18, 0.03)), 0px 3px 3px -1.5px var(--tw-shadow-color, rgba(10, 13, 18, 0.04));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xs {
    --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-xs-skeumorphic {
    --tw-shadow: var(--shadow-skeumorphic), var(--shadow-xs);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-0 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-1 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-2 {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-\[1\.5px\] {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1.5px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .ring-\[1\.67px\] {
    --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1.67px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }
  .shadow-border-secondary {
    --tw-shadow-color: rgb(233 234 235);
    @supports (color: color-mix(in lab, red, red)) {
      --tw-shadow-color: color-mix(in oklab, var(--color-border-secondary) var(--tw-shadow-alpha), transparent);
    }
  }
  .ring-app-store-badge-border {
    --tw-ring-color: var(--color-app-store-badge-border);
  }
  .ring-bg-brand-solid {
    --tw-ring-color: var(--ring-color-bg-brand-solid);
  }
  .ring-bg-primary {
    --tw-ring-color: var(--color-bg-primary);
  }
  .ring-border-primary {
    --tw-ring-color: var(--color-border-primary);
  }
  .ring-brand {
    --tw-ring-color: var(--ring-color-brand);
  }
  .ring-brand_alt {
    --tw-ring-color: var(--ring-color-brand_alt);
  }
  .ring-disabled {
    --tw-ring-color: var(--ring-color-disabled);
  }
  .ring-disabled_subtle {
    --tw-ring-color: var(--ring-color-disabled_subtle);
  }
  .ring-error {
    --tw-ring-color: var(--ring-color-error);
  }
  .ring-error_subtle {
    --tw-ring-color: var(--ring-color-error_subtle);
  }
  .ring-fg-primary {
    --tw-ring-color: var(--color-fg-primary);
  }
  .ring-focus-ring {
    --tw-ring-color: var(--color-focus-ring);
  }
  .ring-primary {
    --tw-ring-color: var(--ring-color-primary);
  }
  .ring-secondary {
    --tw-ring-color: var(--ring-color-secondary);
  }
  .ring-secondary_alt {
    --tw-ring-color: var(--ring-color-secondary_alt);
  }
  .ring-slider-handle-border {
    --tw-ring-color: var(--color-slider-handle-border);
  }
  .ring-transparent {
    --tw-ring-color: transparent;
  }
  .ring-utility-blue-200 {
    --tw-ring-color: var(--color-utility-blue-200);
  }
  .ring-utility-blue-light-200 {
    --tw-ring-color: var(--color-utility-blue-light-200);
  }
  .ring-utility-brand-200 {
    --tw-ring-color: var(--color-utility-brand-200);
  }
  .ring-utility-error-200 {
    --tw-ring-color: var(--color-utility-error-200);
  }
  .ring-utility-gray-200 {
    --tw-ring-color: var(--color-utility-gray-200);
  }
  .ring-utility-gray-blue-200 {
    --tw-ring-color: var(--color-utility-gray-blue-200);
  }
  .ring-utility-indigo-200 {
    --tw-ring-color: var(--color-utility-indigo-200);
  }
  .ring-utility-orange-200 {
    --tw-ring-color: var(--color-utility-orange-200);
  }
  .ring-utility-pink-200 {
    --tw-ring-color: var(--color-utility-pink-200);
  }
  .ring-utility-purple-200 {
    --tw-ring-color: var(--color-utility-purple-200);
  }
  .ring-utility-success-200 {
    --tw-ring-color: var(--color-utility-success-200);
  }
  .ring-utility-warning-200 {
    --tw-ring-color: var(--color-utility-warning-200);
  }
  .outline-hidden {
    --tw-outline-style: none;
    outline-style: none;
    @media (forced-colors: active) {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }
  .outline {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .outline-1 {
    outline-style: var(--tw-outline-style);
    outline-width: 1px;
  }
  .outline-2 {
    outline-style: var(--tw-outline-style);
    outline-width: 2px;
  }
  .outline-3 {
    outline-style: var(--tw-outline-style);
    outline-width: 3px;
  }
  .outline-\[0\.5px\] {
    outline-style: var(--tw-outline-style);
    outline-width: 0.5px;
  }
  .outline-\[0\.75px\] {
    outline-style: var(--tw-outline-style);
    outline-width: 0.75px;
  }
  .-outline-offset-1 {
    outline-offset: calc(1px * -1);
  }
  .-outline-offset-2 {
    outline-offset: calc(2px * -1);
  }
  .-outline-offset-\[0\.5px\] {
    outline-offset: calc(0.5px * -1);
  }
  .-outline-offset-\[0\.75px\] {
    outline-offset: calc(0.75px * -1);
  }
  .outline-offset-2 {
    outline-offset: 2px;
  }
  .outline-avatar-contrast-border {
    outline-color: var(--color-avatar-contrast-border);
  }
  .outline-brand {
    outline-color: var(--outline-color-brand);
  }
  .outline-error {
    outline-color: var(--outline-color-error);
  }
  .outline-focus-ring {
    outline-color: var(--color-focus-ring);
  }
  .outline-transparent {
    outline-color: transparent;
  }
  .outline-utility-brand-100 {
    outline-color: var(--color-utility-brand-100);
  }
  .outline-utility-error-100 {
    outline-color: var(--color-utility-error-100);
  }
  .outline-utility-gray-100 {
    outline-color: var(--color-utility-gray-100);
  }
  .outline-utility-success-100 {
    outline-color: var(--color-utility-success-100);
  }
  .outline-utility-warning-100 {
    outline-color: var(--color-utility-warning-100);
  }
  .drop-shadow-sm {
    --tw-drop-shadow-size: drop-shadow(0 1px 2px var(--tw-drop-shadow-color, rgb(0 0 0 / 0.15)));
    --tw-drop-shadow: drop-shadow(var(--drop-shadow-sm));
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .filter {
    filter: var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,);
  }
  .backdrop-blur {
    --tw-backdrop-blur: blur(8px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-\[6px\] {
    --tw-backdrop-blur: blur(6px);
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-md {
    --tw-backdrop-blur: blur(var(--blur-md));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-sm {
    --tw-backdrop-blur: blur(var(--blur-sm));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .backdrop-blur-xs {
    --tw-backdrop-blur: blur(var(--blur-xs));
    -webkit-backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
    backdrop-filter: var(--tw-backdrop-blur,) var(--tw-backdrop-brightness,) var(--tw-backdrop-contrast,) var(--tw-backdrop-grayscale,) var(--tw-backdrop-hue-rotate,) var(--tw-backdrop-invert,) var(--tw-backdrop-opacity,) var(--tw-backdrop-saturate,) var(--tw-backdrop-sepia,);
  }
  .transition {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\[box-shadow\,background-color\] {
    transition-property: box-shadow,background-color;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-\[inherit\] {
    transition-property: inherit;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-all {
    transition-property: all;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-colors {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-inherit-all {
    transition-property: inherit;
    transition-duration: inherit;
    transition-timing-function: inherit;
  }
  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-shadow {
    transition-property: box-shadow;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .transition-transform {
    transition-property: transform, translate, scale, rotate;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    transition-duration: var(--tw-duration, var(--default-transition-duration));
  }
  .duration-75 {
    --tw-duration: 75ms;
    transition-duration: 75ms;
  }
  .duration-100 {
    --tw-duration: 100ms;
    transition-duration: 100ms;
  }
  .duration-150 {
    --tw-duration: 150ms;
    transition-duration: 150ms;
  }
  .duration-200 {
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
  .duration-300 {
    --tw-duration: 300ms;
    transition-duration: 300ms;
  }
  .duration-500 {
    --tw-duration: 500ms;
    transition-duration: 500ms;
  }
  .ease-in {
    --tw-ease: var(--ease-in);
    transition-timing-function: var(--ease-in);
  }
  .ease-in-out {
    --tw-ease: var(--ease-in-out);
    transition-timing-function: var(--ease-in-out);
  }
  .ease-linear {
    --tw-ease: linear;
    transition-timing-function: linear;
  }
  .ease-out {
    --tw-ease: var(--ease-out);
    transition-timing-function: var(--ease-out);
  }
  .will-change-transform {
    will-change: transform;
  }
  .animate-in {
    animation-name: enter;
    animation-duration: 150ms;
    --tw-enter-opacity: initial;
    --tw-enter-scale: initial;
    --tw-enter-rotate: initial;
    --tw-enter-translate-x: initial;
    --tw-enter-translate-y: initial;
  }
  .animate-out {
    animation-name: exit;
    animation-duration: 150ms;
    --tw-exit-opacity: initial;
    --tw-exit-scale: initial;
    --tw-exit-rotate: initial;
    --tw-exit-translate-x: initial;
    --tw-exit-translate-y: initial;
  }
  .outline-none {
    --tw-outline-style: none;
    outline-style: none;
  }
  .select-none {
    -webkit-user-select: none;
    user-select: none;
  }
  .duration-75 {
    animation-duration: 75ms;
  }
  .duration-100 {
    animation-duration: 100ms;
  }
  .duration-150 {
    animation-duration: 150ms;
  }
  .duration-200 {
    animation-duration: 200ms;
  }
  .duration-300 {
    animation-duration: 300ms;
  }
  .duration-500 {
    animation-duration: 500ms;
  }
  .ease-in {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }
  .ease-in-out {
    animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ease-linear {
    animation-timing-function: linear;
  }
  .ease-out {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  .fade-in {
    --tw-enter-opacity: 0;
  }
  .fade-out {
    --tw-exit-opacity: 0;
  }
  .ring-inset {
    --tw-ring-inset: inset;
  }
  .running {
    animation-play-state: running;
  }
  .slide-in-from-right {
    --tw-enter-translate-x: 100%;
  }
  .slide-in-from-top-1 {
    --tw-enter-translate-y: -0.25rem;
  }
  .slide-out-to-right {
    --tw-exit-translate-x: 100%;
  }
  .slide-out-to-top-1 {
    --tw-exit-translate-y: -0.25rem;
  }
  .zoom-in-95 {
    --tw-enter-scale: .95;
  }
  .zoom-out-95 {
    --tw-exit-scale: .95;
  }
  .not-last\:pr-\[calc\(calc\(var\(--spacing\)\*3\.5\)\+1px\)\] {
    &:not(*:last-child) {
      padding-right: calc(calc(var(--spacing) * 3.5) + 1px);
    }
  }
  .not-last\:pr-\[calc\(calc\(var\(--spacing\)\*4\)\+1px\)\] {
    &:not(*:last-child) {
      padding-right: calc(calc(var(--spacing) * 4) + 1px);
    }
  }
  .not-last\:pr-\[calc\(calc\(var\(--spacing\)\*4\.5\)\+1px\)\] {
    &:not(*:last-child) {
      padding-right: calc(calc(var(--spacing) * 4.5) + 1px);
    }
  }
  .not-dark\:hidden {
    &:not(*:where(.dark-mode, .dark-mode *)) {
      display: none;
    }
  }
  .group-required\:block {
    &:is(:where(.group):where([data-rac])[data-required] *) {
      display: block;
    }
    &:is(:where(.group):where(:not([data-rac])):required *) {
      display: block;
    }
  }
  .group-invalid\:text-error-primary {
    &:is(:where(.group):where([data-rac])[data-invalid] *) {
      color: var(--text-color-error-primary);
    }
    &:is(:where(.group):where(:not([data-rac])):invalid *) {
      color: var(--text-color-error-primary);
    }
  }
  .group-invalid\:ring-2 {
    &:is(:where(.group):where([data-rac])[data-invalid] *) {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:is(:where(.group):where(:not([data-rac])):invalid *) {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .group-invalid\:ring-error {
    &:is(:where(.group):where([data-rac])[data-invalid] *) {
      --tw-ring-color: var(--ring-color-error);
    }
    &:is(:where(.group):where(:not([data-rac])):invalid *) {
      --tw-ring-color: var(--ring-color-error);
    }
  }
  .group-invalid\:ring-error_subtle {
    &:is(:where(.group):where([data-rac])[data-invalid] *) {
      --tw-ring-color: var(--ring-color-error_subtle);
    }
    &:is(:where(.group):where(:not([data-rac])):invalid *) {
      --tw-ring-color: var(--ring-color-error_subtle);
    }
  }
  .group-hover\:block {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      display: block;
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        display: block;
      }
    }
  }
  .group-hover\:scale-105 {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      --tw-scale-x: 105%;
      --tw-scale-y: 105%;
      --tw-scale-z: 105%;
      scale: var(--tw-scale-x) var(--tw-scale-y);
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        --tw-scale-x: 105%;
        --tw-scale-y: 105%;
        --tw-scale-z: 105%;
        scale: var(--tw-scale-x) var(--tw-scale-y);
      }
    }
  }
  .group-hover\:scale-\[1\.03\] {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      scale: 1.03;
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        scale: 1.03;
      }
    }
  }
  .group-hover\:bg-black\/10 {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      background-color: color-mix(in srgb, rgb(0 0 0) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-black) 10%, transparent);
      }
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        background-color: color-mix(in srgb, rgb(0 0 0) 10%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-black) 10%, transparent);
        }
      }
    }
  }
  .group-hover\:bg-primary_hover {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      background-color: var(--background-color-primary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        background-color: var(--background-color-primary_hover);
      }
    }
  }
  .group-hover\:text-fg-quaternary_hover {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      color: var(--color-fg-quaternary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        color: var(--color-fg-quaternary_hover);
      }
    }
  }
  .group-hover\:text-secondary_hover {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      color: var(--text-color-secondary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        color: var(--text-color-secondary_hover);
      }
    }
  }
  .group-hover\:opacity-100 {
    &:is(:where(.group):where([data-rac])[data-hovered] *) {
      opacity: 100%;
    }
    @media (hover: hover) {
      &:is(:where(.group):where(:not([data-rac])):hover *) {
        opacity: 100%;
      }
    }
  }
  .group-hover\/button-group\:text-fg-quaternary_hover {
    &:is(:where(.group\/button-group):where([data-rac])[data-hovered] *) {
      color: var(--color-fg-quaternary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group\/button-group):where(:not([data-rac])):hover *) {
        color: var(--color-fg-quaternary_hover);
      }
    }
  }
  .group-hover\/child\:block {
    &:is(:where(.group\/child):where([data-rac])[data-hovered] *) {
      display: block;
    }
    @media (hover: hover) {
      &:is(:where(.group\/child):where(:not([data-rac])):hover *) {
        display: block;
      }
    }
  }
  .group-hover\/item\:bg-primary_hover {
    &:is(:where(.group\/item):where([data-rac])[data-hovered] *) {
      background-color: var(--background-color-primary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group\/item):where(:not([data-rac])):hover *) {
        background-color: var(--background-color-primary_hover);
      }
    }
  }
  .group-hover\/item\:text-secondary_hover {
    &:is(:where(.group\/item):where([data-rac])[data-hovered] *) {
      color: var(--text-color-secondary_hover);
    }
    @media (hover: hover) {
      &:is(:where(.group\/item):where(:not([data-rac])):hover *) {
        color: var(--text-color-secondary_hover);
      }
    }
  }
  .group-focus-visible\:outline-2 {
    &:is(:where(.group):where([data-rac])[data-focus-visible] *) {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
    &:is(:where(.group):where(:not([data-rac])):focus-visible *) {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
  }
  .group-focus-visible\:outline-offset-2 {
    &:is(:where(.group):where([data-rac])[data-focus-visible] *) {
      outline-offset: 2px;
    }
    &:is(:where(.group):where(:not([data-rac])):focus-visible *) {
      outline-offset: 2px;
    }
  }
  .group-focus-visible\/item\:outline-2 {
    &:is(:where(.group\/item):where([data-rac])[data-focus-visible] *) {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
    &:is(:where(.group\/item):where(:not([data-rac])):focus-visible *) {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
  }
  .group-focus-visible\/item\:outline-offset-2 {
    &:is(:where(.group\/item):where([data-rac])[data-focus-visible] *) {
      outline-offset: 2px;
    }
    &:is(:where(.group\/item):where(:not([data-rac])):focus-visible *) {
      outline-offset: 2px;
    }
  }
  .group-disabled\:cursor-not-allowed {
    &:is(:where(.group):where([data-rac])[data-disabled] *) {
      cursor: not-allowed;
    }
    &:is(:where(.group):where(:not([data-rac])):disabled *) {
      cursor: not-allowed;
    }
  }
  .group-disabled\:bg-disabled_subtle {
    &:is(:where(.group):where([data-rac])[data-disabled] *) {
      background-color: var(--background-color-disabled_subtle);
    }
    &:is(:where(.group):where(:not([data-rac])):disabled *) {
      background-color: var(--background-color-disabled_subtle);
    }
  }
  .group-disabled\:ring-disabled {
    &:is(:where(.group):where([data-rac])[data-disabled] *) {
      --tw-ring-color: var(--ring-color-disabled);
    }
    &:is(:where(.group):where(:not([data-rac])):disabled *) {
      --tw-ring-color: var(--ring-color-disabled);
    }
  }
  .group-disabled\/button-group\:text-fg-disabled_subtle {
    &:is(:where(.group\/button-group):where([data-rac])[data-disabled] *) {
      color: var(--color-fg-disabled_subtle);
    }
    &:is(:where(.group\/button-group):where(:not([data-rac])):disabled *) {
      color: var(--color-fg-disabled_subtle);
    }
  }
  .group-has-\[\&\>select\]\:right-0 {
    &:is(:where(.group):has(*>select) *) {
      right: calc(var(--spacing) * 0);
    }
  }
  .group-has-\[\&\>select\]\:bg-transparent {
    &:is(:where(.group):has(*>select) *) {
      background-color: transparent;
    }
  }
  .group-has-\[\&\>select\]\:px-2\.5 {
    &:is(:where(.group):has(*>select) *) {
      padding-inline: calc(var(--spacing) * 2.5);
    }
  }
  .group-has-\[\&\>select\]\:px-3 {
    &:is(:where(.group):has(*>select) *) {
      padding-inline: calc(var(--spacing) * 3);
    }
  }
  .group-has-\[\&\>select\]\:pr-6 {
    &:is(:where(.group):has(*>select) *) {
      padding-right: calc(var(--spacing) * 6);
    }
  }
  .group-has-\[\&\>select\]\:pl-0 {
    &:is(:where(.group):has(*>select) *) {
      padding-left: calc(var(--spacing) * 0);
    }
  }
  .group-has-\[\&\>select\]\:pl-2\.5 {
    &:is(:where(.group):has(*>select) *) {
      padding-left: calc(var(--spacing) * 2.5);
    }
  }
  .group-has-\[\&\>select\]\:pl-3 {
    &:is(:where(.group):has(*>select) *) {
      padding-left: calc(var(--spacing) * 3);
    }
  }
  .group-has-\[\&\>select\]\:shadow-none {
    &:is(:where(.group):has(*>select) *) {
      --tw-shadow: 0 0 #0000;
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .group-has-\[\&\>select\]\:ring-0 {
    &:is(:where(.group):has(*>select) *) {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .group-disabled\:group-has-\[\&\>select\]\:bg-transparent {
    &:is(:where(.group):where([data-rac])[data-disabled] *) {
      &:is(:where(.group):has(*>select) *) {
        background-color: transparent;
      }
    }
    &:is(:where(.group):where(:not([data-rac])):disabled *) {
      &:is(:where(.group):has(*>select) *) {
        background-color: transparent;
      }
    }
  }
  .group-aria-expanded\:block {
    &:is(:where(.group)[aria-expanded="true"] *) {
      display: block;
    }
  }
  .group-aria-expanded\:hidden {
    &:is(:where(.group)[aria-expanded="true"] *) {
      display: none;
    }
  }
  .group-aria-expanded\:opacity-0 {
    &:is(:where(.group)[aria-expanded="true"] *) {
      opacity: 0%;
    }
  }
  .group-aria-expanded\:opacity-100 {
    &:is(:where(.group)[aria-expanded="true"] *) {
      opacity: 100%;
    }
  }
  .group-orientation-vertical\:justify-start {
    &:is(:where(.group)[data-orientation="vertical"] *) {
      justify-content: flex-start;
    }
  }
  .placeholder\:text-fg-quaternary {
    &::placeholder {
      color: var(--color-fg-quaternary);
    }
  }
  .placeholder\:text-placeholder {
    &::placeholder {
      color: var(--text-color-placeholder);
    }
  }
  .before\:absolute {
    &::before {
      content: var(--tw-content);
      position: absolute;
    }
  }
  .before\:inset-0 {
    &::before {
      content: var(--tw-content);
      inset: calc(var(--spacing) * 0);
    }
  }
  .before\:inset-1 {
    &::before {
      content: var(--tw-content);
      inset: calc(var(--spacing) * 1);
    }
  }
  .before\:inset-px {
    &::before {
      content: var(--tw-content);
      inset: 1px;
    }
  }
  .before\:inset-x-0 {
    &::before {
      content: var(--tw-content);
      inset-inline: calc(var(--spacing) * 0);
    }
  }
  .before\:-top-2 {
    &::before {
      content: var(--tw-content);
      top: calc(var(--spacing) * -2);
    }
  }
  .before\:top-0 {
    &::before {
      content: var(--tw-content);
      top: calc(var(--spacing) * 0);
    }
  }
  .before\:bottom-0 {
    &::before {
      content: var(--tw-content);
      bottom: calc(var(--spacing) * 0);
    }
  }
  .before\:-left-2 {
    &::before {
      content: var(--tw-content);
      left: calc(var(--spacing) * -2);
    }
  }
  .before\:left-0 {
    &::before {
      content: var(--tw-content);
      left: calc(var(--spacing) * 0);
    }
  }
  .before\:size-6 {
    &::before {
      content: var(--tw-content);
      width: calc(var(--spacing) * 6);
      height: calc(var(--spacing) * 6);
    }
  }
  .before\:size-7 {
    &::before {
      content: var(--tw-content);
      width: calc(var(--spacing) * 7);
      height: calc(var(--spacing) * 7);
    }
  }
  .before\:size-8 {
    &::before {
      content: var(--tw-content);
      width: calc(var(--spacing) * 8);
      height: calc(var(--spacing) * 8);
    }
  }
  .before\:size-9 {
    &::before {
      content: var(--tw-content);
      width: calc(var(--spacing) * 9);
      height: calc(var(--spacing) * 9);
    }
  }
  .before\:size-full {
    &::before {
      content: var(--tw-content);
      width: 100%;
      height: 100%;
    }
  }
  .before\:h-2 {
    &::before {
      content: var(--tw-content);
      height: calc(var(--spacing) * 2);
    }
  }
  .before\:h-full {
    &::before {
      content: var(--tw-content);
      height: 100%;
    }
  }
  .before\:h-px {
    &::before {
      content: var(--tw-content);
      height: 1px;
    }
  }
  .before\:w-2 {
    &::before {
      content: var(--tw-content);
      width: calc(var(--spacing) * 2);
    }
  }
  .before\:w-full {
    &::before {
      content: var(--tw-content);
      width: 100%;
    }
  }
  .before\:rounded-\[4px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 4px;
    }
  }
  .before\:rounded-\[5px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 5px;
    }
  }
  .before\:rounded-\[6px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 6px;
    }
  }
  .before\:rounded-\[7px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 7px;
    }
  }
  .before\:rounded-\[8px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 8px;
    }
  }
  .before\:rounded-\[9px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 9px;
    }
  }
  .before\:rounded-\[10px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 10px;
    }
  }
  .before\:rounded-\[11px\] {
    &::before {
      content: var(--tw-content);
      border-radius: 11px;
    }
  }
  .before\:rounded-full {
    &::before {
      content: var(--tw-content);
      border-radius: var(--radius-full);
    }
  }
  .before\:border {
    &::before {
      content: var(--tw-content);
      border-style: var(--tw-border-style);
      border-width: 1px;
    }
  }
  .before\:border-2 {
    &::before {
      content: var(--tw-content);
      border-style: var(--tw-border-style);
      border-width: 2px;
    }
  }
  .before\:border-fg-brand-primary\/30 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(21 112 239) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-brand-primary) 30%, transparent);
      }
    }
  }
  .before\:border-fg-error-primary\/30 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(217 45 32) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-error-primary) 30%, transparent);
      }
    }
  }
  .before\:border-fg-success-primary\/30 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(7 148 85) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-success-primary) 30%, transparent);
      }
    }
  }
  .before\:border-fg-tertiary\/30 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(83 88 98) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-tertiary) 30%, transparent);
      }
    }
  }
  .before\:border-fg-warning-primary\/30 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(220 104 3) 30%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-warning-primary) 30%, transparent);
      }
    }
  }
  .before\:border-utility-brand-200 {
    &::before {
      content: var(--tw-content);
      border-color: var(--color-utility-brand-200);
    }
  }
  .before\:border-utility-brand-200\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(178 221 255) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-utility-brand-200) 12%, transparent);
      }
    }
  }
  .before\:border-utility-error-200 {
    &::before {
      content: var(--tw-content);
      border-color: var(--color-utility-error-200);
    }
  }
  .before\:border-utility-error-200\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(254 205 202) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-utility-error-200) 12%, transparent);
      }
    }
  }
  .before\:border-utility-gray-200 {
    &::before {
      content: var(--tw-content);
      border-color: var(--color-utility-gray-200);
    }
  }
  .before\:border-utility-gray-200\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(233 234 235) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-utility-gray-200) 12%, transparent);
      }
    }
  }
  .before\:border-utility-success-200 {
    &::before {
      content: var(--tw-content);
      border-color: var(--color-utility-success-200);
    }
  }
  .before\:border-utility-success-200\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(171 239 198) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-utility-success-200) 12%, transparent);
      }
    }
  }
  .before\:border-utility-warning-200 {
    &::before {
      content: var(--tw-content);
      border-color: var(--color-utility-warning-200);
    }
  }
  .before\:border-utility-warning-200\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(254 223 137) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-utility-warning-200) 12%, transparent);
      }
    }
  }
  .before\:border-white\/12 {
    &::before {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(255 255 255) 12%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-white) 12%, transparent);
      }
    }
  }
  .before\:bg-border-secondary {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-border-secondary);
    }
  }
  .before\:bg-utility-brand-50 {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-utility-brand-50);
    }
  }
  .before\:bg-utility-error-50 {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-utility-error-50);
    }
  }
  .before\:bg-utility-gray-50 {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-utility-gray-50);
    }
  }
  .before\:bg-utility-success-50 {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-utility-success-50);
    }
  }
  .before\:bg-utility-warning-50 {
    &::before {
      content: var(--tw-content);
      background-color: var(--color-utility-warning-50);
    }
  }
  .before\:mask-b-from-0\% {
    &::before {
      content: var(--tw-content);
      mask-image: var(--tw-mask-linear), var(--tw-mask-radial), var(--tw-mask-conic);
      mask-composite: intersect;
      --tw-mask-linear: var(--tw-mask-left), var(--tw-mask-right), var(--tw-mask-bottom), var(--tw-mask-top);
      --tw-mask-bottom: linear-gradient(to bottom, var(--tw-mask-bottom-from-color) var(--tw-mask-bottom-from-position), var(--tw-mask-bottom-to-color) var(--tw-mask-bottom-to-position));
      --tw-mask-bottom-from-position: 0%;
    }
  }
  .before\:shadow-\[0px_1px_2px_0px_rgba\(0\,0\,0\,0\.1\)\,0px_3px_3px_0px_rgba\(0\,0\,0\,0\.09\)\,1px_8px_5px_0px_rgba\(0\,0\,0\,0\.05\)\,2px_21px_6px_0px_rgba\(0\,0\,0\,0\)\,0px_0px_0px_1px_rgba\(0\,0\,0\,0\.08\)\,1px_13px_5px_0px_rgba\(0\,0\,0\,0\.01\)\,0px_-2px_2px_0px_rgba\(0\,0\,0\,0\.13\)_inset\] {
    &::before {
      content: var(--tw-content);
      --tw-shadow: 0px 1px 2px 0px var(--tw-shadow-color, rgba(0,0,0,0.1)), 0px 3px 3px 0px var(--tw-shadow-color, rgba(0,0,0,0.09)), 1px 8px 5px 0px var(--tw-shadow-color, rgba(0,0,0,0.05)), 2px 21px 6px 0px var(--tw-shadow-color, rgba(0,0,0,0)), 0px 0px 0px 1px var(--tw-shadow-color, rgba(0,0,0,0.08)), 1px 13px 5px 0px var(--tw-shadow-color, rgba(0,0,0,0.01)), 0px -2px 2px 0px var(--tw-shadow-color, rgba(0,0,0,0.13)) inset;
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .before\:ring-1 {
    &::before {
      content: var(--tw-content);
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .before\:ring-secondary_alt {
    &::before {
      content: var(--tw-content);
      --tw-ring-color: var(--ring-color-secondary_alt);
    }
  }
  .before\:content-\[\'\'\] {
    &::before {
      --tw-content: '';
      content: var(--tw-content);
    }
  }
  .after\:pointer-events-none {
    &::after {
      content: var(--tw-content);
      pointer-events: none;
    }
  }
  .after\:absolute {
    &::after {
      content: var(--tw-content);
      position: absolute;
    }
  }
  .after\:inset-0 {
    &::after {
      content: var(--tw-content);
      inset: calc(var(--spacing) * 0);
    }
  }
  .after\:-inset-x-1\.5 {
    &::after {
      content: var(--tw-content);
      inset-inline: calc(var(--spacing) * -1.5);
    }
  }
  .after\:-inset-x-2 {
    &::after {
      content: var(--tw-content);
      inset-inline: calc(var(--spacing) * -2);
    }
  }
  .after\:-inset-y-2 {
    &::after {
      content: var(--tw-content);
      inset-block: calc(var(--spacing) * -2);
    }
  }
  .after\:-inset-y-3 {
    &::after {
      content: var(--tw-content);
      inset-block: calc(var(--spacing) * -3);
    }
  }
  .after\:block {
    &::after {
      content: var(--tw-content);
      display: block;
    }
  }
  .after\:size-6 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 6);
      height: calc(var(--spacing) * 6);
    }
  }
  .after\:size-7 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 7);
      height: calc(var(--spacing) * 7);
    }
  }
  .after\:size-8 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 8);
      height: calc(var(--spacing) * 8);
    }
  }
  .after\:size-8\.5 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 8.5);
      height: calc(var(--spacing) * 8.5);
    }
  }
  .after\:size-9\.5 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 9.5);
      height: calc(var(--spacing) * 9.5);
    }
  }
  .after\:size-10 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 10);
      height: calc(var(--spacing) * 10);
    }
  }
  .after\:size-10\.5 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 10.5);
      height: calc(var(--spacing) * 10.5);
    }
  }
  .after\:size-11\.5 {
    &::after {
      content: var(--tw-content);
      width: calc(var(--spacing) * 11.5);
      height: calc(var(--spacing) * 11.5);
    }
  }
  .after\:-translate-x-full {
    &::after {
      content: var(--tw-content);
      --tw-translate-x: -100%;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .after\:translate-x-full {
    &::after {
      content: var(--tw-content);
      --tw-translate-x: 100%;
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
  }
  .after\:rounded-full {
    &::after {
      content: var(--tw-content);
      border-radius: var(--radius-full);
    }
  }
  .after\:border-2 {
    &::after {
      content: var(--tw-content);
      border-style: var(--tw-border-style);
      border-width: 2px;
    }
  }
  .after\:border-fg-brand-primary\/10 {
    &::after {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(21 112 239) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-brand-primary) 10%, transparent);
      }
    }
  }
  .after\:border-fg-error-primary\/10 {
    &::after {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(217 45 32) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-error-primary) 10%, transparent);
      }
    }
  }
  .after\:border-fg-success-primary\/10 {
    &::after {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(7 148 85) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-success-primary) 10%, transparent);
      }
    }
  }
  .after\:border-fg-tertiary\/10 {
    &::after {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(83 88 98) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-tertiary) 10%, transparent);
      }
    }
  }
  .after\:border-fg-warning-primary\/10 {
    &::after {
      content: var(--tw-content);
      border-color: color-mix(in srgb, rgb(220 104 3) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--color-fg-warning-primary) 10%, transparent);
      }
    }
  }
  .after\:bg-brand-solid {
    &::after {
      content: var(--tw-content);
      background-color: var(--background-color-brand-solid);
    }
  }
  .after\:bg-error-solid {
    &::after {
      content: var(--tw-content);
      background-color: var(--background-color-error-solid);
    }
  }
  .after\:bg-secondary-solid {
    &::after {
      content: var(--tw-content);
      background-color: var(--background-color-secondary-solid);
    }
  }
  .after\:bg-success-solid {
    &::after {
      content: var(--tw-content);
      background-color: var(--background-color-success-solid);
    }
  }
  .after\:bg-warning-solid {
    &::after {
      content: var(--tw-content);
      background-color: var(--background-color-warning-solid);
    }
  }
  .after\:bg-gradient-to-l {
    &::after {
      content: var(--tw-content);
      --tw-gradient-position: to left in oklab;
      background-image: linear-gradient(var(--tw-gradient-stops));
    }
  }
  .after\:bg-gradient-to-r {
    &::after {
      content: var(--tw-content);
      --tw-gradient-position: to right in oklab;
      background-image: linear-gradient(var(--tw-gradient-stops));
    }
  }
  .after\:from-transparent {
    &::after {
      content: var(--tw-content);
      --tw-gradient-from: transparent;
      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
    }
  }
  .after\:to-bg-active {
    &::after {
      content: var(--tw-content);
      --tw-gradient-to: var(--color-bg-active);
      --tw-gradient-stops: var(--tw-gradient-via-stops, var(--tw-gradient-position), var(--tw-gradient-from) var(--tw-gradient-from-position), var(--tw-gradient-to) var(--tw-gradient-to-position));
    }
  }
  .first\:rounded-l-lg {
    &:first-child {
      border-top-left-radius: var(--radius-lg);
      border-bottom-left-radius: var(--radius-lg);
    }
  }
  .last\:mb-0 {
    &:last-child {
      margin-bottom: calc(var(--spacing) * 0);
    }
  }
  .last\:rounded-r-lg {
    &:last-child {
      border-top-right-radius: var(--radius-lg);
      border-bottom-right-radius: var(--radius-lg);
    }
  }
  .autofill\:rounded-lg {
    &:autofill {
      border-radius: var(--radius-lg);
    }
  }
  .autofill\:text-primary {
    &:autofill {
      color: var(--text-color-primary);
    }
  }
  .focus-within\:ring-2 {
    &:where([data-rac])[data-focus-within] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:where(:not([data-rac])):focus-within {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-within\:ring-brand {
    &:where([data-rac])[data-focus-within] {
      --tw-ring-color: var(--ring-color-brand);
    }
    &:where(:not([data-rac])):focus-within {
      --tw-ring-color: var(--ring-color-brand);
    }
  }
  .group-has-\[\&\>select\]\:focus-within\:ring-0 {
    &:is(:where(.group):has(*>select) *) {
      &:where([data-rac])[data-focus-within] {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
      &:where(:not([data-rac])):focus-within {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .hover\:-translate-y-0\.5 {
    &:where([data-rac])[data-hovered] {
      --tw-translate-y: calc(var(--spacing) * -0.5);
      translate: var(--tw-translate-x) var(--tw-translate-y);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        --tw-translate-y: calc(var(--spacing) * -0.5);
        translate: var(--tw-translate-x) var(--tw-translate-y);
      }
    }
  }
  .hover\:rounded-sm {
    &:where([data-rac])[data-hovered] {
      border-radius: var(--radius-sm);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        border-radius: var(--radius-sm);
      }
    }
  }
  .hover\:border-primary {
    &:where([data-rac])[data-hovered] {
      border-color: var(--border-color-primary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        border-color: var(--border-color-primary);
      }
    }
  }
  .hover\:border-primary\/50 {
    &:where([data-rac])[data-hovered] {
      border-color: color-mix(in srgb, rgb(213 215 218) 50%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        border-color: color-mix(in oklab, var(--border-color-primary) 50%, transparent);
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        border-color: color-mix(in srgb, rgb(213 215 218) 50%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          border-color: color-mix(in oklab, var(--border-color-primary) 50%, transparent);
        }
      }
    }
  }
  .hover\:bg-\[\#0C63D4\] {
    &:where([data-rac])[data-hovered] {
      background-color: #0C63D4;
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: #0C63D4;
      }
    }
  }
  .hover\:bg-\[\#E62872\] {
    &:where([data-rac])[data-hovered] {
      background-color: #E62872;
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: #E62872;
      }
    }
  }
  .hover\:bg-black\/10 {
    &:where([data-rac])[data-hovered] {
      background-color: color-mix(in srgb, rgb(0 0 0) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-black) 10%, transparent);
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: color-mix(in srgb, rgb(0 0 0) 10%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-black) 10%, transparent);
        }
      }
    }
  }
  .hover\:bg-blue-800 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-blue-800);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-blue-800);
      }
    }
  }
  .hover\:bg-brand-primary_alt {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-brand-primary_alt);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-brand-primary_alt);
      }
    }
  }
  .hover\:bg-brand-solid_hover {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-brand-solid_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-brand-solid_hover);
      }
    }
  }
  .hover\:bg-error-primary {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-error-primary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-error-primary);
      }
    }
  }
  .hover\:bg-error-solid_hover {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-error-solid_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-error-solid_hover);
      }
    }
  }
  .hover\:bg-gray-50 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-gray-50);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-gray-50);
      }
    }
  }
  .hover\:bg-primary_hover {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-primary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-primary_hover);
      }
    }
  }
  .hover\:bg-secondary {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-secondary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-secondary);
      }
    }
  }
  .hover\:bg-secondary\/70 {
    &:where([data-rac])[data-hovered] {
      background-color: color-mix(in srgb, rgb(250 250 250) 70%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--background-color-secondary) 70%, transparent);
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: color-mix(in srgb, rgb(250 250 250) 70%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--background-color-secondary) 70%, transparent);
        }
      }
    }
  }
  .hover\:bg-secondary_hover {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-secondary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-secondary_hover);
      }
    }
  }
  .hover\:bg-success-primary {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-success-primary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-success-primary);
      }
    }
  }
  .hover\:bg-utility-blue-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-blue-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-blue-100);
      }
    }
  }
  .hover\:bg-utility-blue-light-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-blue-light-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-blue-light-100);
      }
    }
  }
  .hover\:bg-utility-brand-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-brand-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-brand-100);
      }
    }
  }
  .hover\:bg-utility-error-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-error-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-error-100);
      }
    }
  }
  .hover\:bg-utility-gray-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-gray-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-gray-100);
      }
    }
  }
  .hover\:bg-utility-gray-blue-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-gray-blue-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-gray-blue-100);
      }
    }
  }
  .hover\:bg-utility-indigo-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-indigo-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-indigo-100);
      }
    }
  }
  .hover\:bg-utility-orange-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-orange-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-orange-100);
      }
    }
  }
  .hover\:bg-utility-pink-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-pink-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-pink-100);
      }
    }
  }
  .hover\:bg-utility-purple-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-purple-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-purple-100);
      }
    }
  }
  .hover\:bg-utility-success-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-success-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-success-100);
      }
    }
  }
  .hover\:bg-utility-warning-100 {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-utility-warning-100);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-utility-warning-100);
      }
    }
  }
  .hover\:bg-warning-primary {
    &:where([data-rac])[data-hovered] {
      background-color: var(--background-color-warning-primary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--background-color-warning-primary);
      }
    }
  }
  .hover\:bg-white {
    &:where([data-rac])[data-hovered] {
      background-color: var(--color-white);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: var(--color-white);
      }
    }
  }
  .hover\:bg-white\/10 {
    &:where([data-rac])[data-hovered] {
      background-color: color-mix(in srgb, rgb(255 255 255) 10%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: color-mix(in srgb, rgb(255 255 255) 10%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
        }
      }
    }
  }
  .hover\:bg-white\/20 {
    &:where([data-rac])[data-hovered] {
      background-color: color-mix(in srgb, rgb(255 255 255) 20%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-white) 20%, transparent);
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        background-color: color-mix(in srgb, rgb(255 255 255) 20%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 20%, transparent);
        }
      }
    }
  }
  .hover\:font-medium\! {
    &:where([data-rac])[data-hovered] {
      --tw-font-weight: var(--font-weight-medium) !important;
      font-weight: var(--font-weight-medium) !important;
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        --tw-font-weight: var(--font-weight-medium) !important;
        font-weight: var(--font-weight-medium) !important;
      }
    }
  }
  .hover\:text-brand-secondary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-brand-secondary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-brand-secondary_hover);
      }
    }
  }
  .hover\:text-error-primary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-error-primary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-error-primary_hover);
      }
    }
  }
  .hover\:text-fg-quaternary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--color-fg-quaternary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-fg-quaternary_hover);
      }
    }
  }
  .hover\:text-fg-secondary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--color-fg-secondary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-fg-secondary_hover);
      }
    }
  }
  .hover\:text-fg-white {
    &:where([data-rac])[data-hovered] {
      color: var(--color-fg-white);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-fg-white);
      }
    }
  }
  .hover\:text-primary {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-primary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-primary);
      }
    }
  }
  .hover\:text-secondary {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-secondary);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-secondary);
      }
    }
  }
  .hover\:text-secondary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-secondary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-secondary_hover);
      }
    }
  }
  .hover\:text-tertiary_hover {
    &:where([data-rac])[data-hovered] {
      color: var(--text-color-tertiary_hover);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--text-color-tertiary_hover);
      }
    }
  }
  .hover\:text-utility-blue-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-blue-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-blue-500);
      }
    }
  }
  .hover\:text-utility-blue-light-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-blue-light-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-blue-light-500);
      }
    }
  }
  .hover\:text-utility-brand-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-brand-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-brand-500);
      }
    }
  }
  .hover\:text-utility-error-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-error-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-error-500);
      }
    }
  }
  .hover\:text-utility-gray-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-gray-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-gray-500);
      }
    }
  }
  .hover\:text-utility-gray-blue-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-gray-blue-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-gray-blue-500);
      }
    }
  }
  .hover\:text-utility-indigo-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-indigo-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-indigo-500);
      }
    }
  }
  .hover\:text-utility-orange-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-orange-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-orange-500);
      }
    }
  }
  .hover\:text-utility-pink-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-pink-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-pink-500);
      }
    }
  }
  .hover\:text-utility-purple-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-purple-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-purple-500);
      }
    }
  }
  .hover\:text-utility-success-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-success-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-success-500);
      }
    }
  }
  .hover\:text-utility-warning-500 {
    &:where([data-rac])[data-hovered] {
      color: var(--color-utility-warning-500);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-utility-warning-500);
      }
    }
  }
  .hover\:text-white {
    &:where([data-rac])[data-hovered] {
      color: var(--color-white);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        color: var(--color-white);
      }
    }
  }
  .hover\:underline {
    &:where([data-rac])[data-hovered] {
      text-decoration-line: underline;
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        text-decoration-line: underline;
      }
    }
  }
  .hover\:opacity-90 {
    &:where([data-rac])[data-hovered] {
      opacity: 90%;
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        opacity: 90%;
      }
    }
  }
  .hover\:shadow-md {
    &:where([data-rac])[data-hovered] {
      --tw-shadow: 0px 4px 6px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.1)), 0px 2px 4px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.06));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        --tw-shadow: 0px 4px 6px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.1)), 0px 2px 4px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.06));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .hover\:shadow-xs {
    &:where([data-rac])[data-hovered] {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .focus\:z-10 {
    &:where([data-rac])[data-focused] {
      z-index: 10;
    }
    &:where(:not([data-rac])):focus {
      z-index: 10;
    }
  }
  .focus\:border-primary {
    &:where([data-rac])[data-focused] {
      border-color: var(--border-color-primary);
    }
    &:where(:not([data-rac])):focus {
      border-color: var(--border-color-primary);
    }
  }
  .focus\:bg-brand-solid {
    &:where([data-rac])[data-focused] {
      background-color: var(--background-color-brand-solid);
    }
    &:where(:not([data-rac])):focus {
      background-color: var(--background-color-brand-solid);
    }
  }
  .focus\:font-medium {
    &:where([data-rac])[data-focused] {
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
    }
    &:where(:not([data-rac])):focus {
      --tw-font-weight: var(--font-weight-medium);
      font-weight: var(--font-weight-medium);
    }
  }
  .focus\:text-fg-quaternary_hover {
    &:where([data-rac])[data-focused] {
      color: var(--color-fg-quaternary_hover);
    }
    &:where(:not([data-rac])):focus {
      color: var(--color-fg-quaternary_hover);
    }
  }
  .focus\:text-white {
    &:where([data-rac])[data-focused] {
      color: var(--color-white);
    }
    &:where(:not([data-rac])):focus {
      color: var(--color-white);
    }
  }
  .focus\:ring {
    &:where([data-rac])[data-focused] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:where(:not([data-rac])):focus {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus\:ring-0 {
    &:where([data-rac])[data-focused] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:where(:not([data-rac])):focus {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus\:ring-primary {
    &:where([data-rac])[data-focused] {
      --tw-ring-color: var(--ring-color-primary);
    }
    &:where(:not([data-rac])):focus {
      --tw-ring-color: var(--ring-color-primary);
    }
  }
  .focus\:outline-hidden {
    &:where([data-rac])[data-focused] {
      --tw-outline-style: none;
      outline-style: none;
      @media (forced-colors: active) {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }
    &:where(:not([data-rac])):focus {
      --tw-outline-style: none;
      outline-style: none;
      @media (forced-colors: active) {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }
  }
  .focus\:outline-offset-2 {
    &:where([data-rac])[data-focused] {
      outline-offset: 2px;
    }
    &:where(:not([data-rac])):focus {
      outline-offset: 2px;
    }
  }
  .focus\:outline-none {
    &:where([data-rac])[data-focused] {
      --tw-outline-style: none;
      outline-style: none;
    }
    &:where(:not([data-rac])):focus {
      --tw-outline-style: none;
      outline-style: none;
    }
  }
  .focus-visible\:z-1 {
    &:where([data-rac])[data-focus-visible] {
      z-index: 1;
    }
    &:where(:not([data-rac])):focus-visible {
      z-index: 1;
    }
  }
  .focus-visible\:z-10 {
    &:where([data-rac])[data-focus-visible] {
      z-index: 10;
    }
    &:where(:not([data-rac])):focus-visible {
      z-index: 10;
    }
  }
  .focus-visible\:bg-primary_hover {
    &:where([data-rac])[data-focus-visible] {
      background-color: var(--background-color-primary_hover);
    }
    &:where(:not([data-rac])):focus-visible {
      background-color: var(--background-color-primary_hover);
    }
  }
  .focus-visible\:ring-2 {
    &:where([data-rac])[data-focus-visible] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:where(:not([data-rac])):focus-visible {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .focus-visible\:ring-brand {
    &:where([data-rac])[data-focus-visible] {
      --tw-ring-color: var(--ring-color-brand);
    }
    &:where(:not([data-rac])):focus-visible {
      --tw-ring-color: var(--ring-color-brand);
    }
  }
  .focus-visible\:ring-focus-ring {
    &:where([data-rac])[data-focus-visible] {
      --tw-ring-color: var(--color-focus-ring);
    }
    &:where(:not([data-rac])):focus-visible {
      --tw-ring-color: var(--color-focus-ring);
    }
  }
  .focus-visible\:ring-offset-bg-primary {
    &:where([data-rac])[data-focus-visible] {
      --tw-ring-offset-color: var(--color-bg-primary);
    }
    &:where(:not([data-rac])):focus-visible {
      --tw-ring-offset-color: var(--color-bg-primary);
    }
  }
  .focus-visible\:outline-2 {
    &:where([data-rac])[data-focus-visible] {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
    &:where(:not([data-rac])):focus-visible {
      outline-style: var(--tw-outline-style);
      outline-width: 2px;
    }
  }
  .focus-visible\:-outline-offset-2 {
    &:where([data-rac])[data-focus-visible] {
      outline-offset: calc(2px * -1);
    }
    &:where(:not([data-rac])):focus-visible {
      outline-offset: calc(2px * -1);
    }
  }
  .focus-visible\:outline-offset-2 {
    &:where([data-rac])[data-focus-visible] {
      outline-offset: 2px;
    }
    &:where(:not([data-rac])):focus-visible {
      outline-offset: 2px;
    }
  }
  .focus-visible\:outline-focus-ring {
    &:where([data-rac])[data-focus-visible] {
      outline-color: var(--color-focus-ring);
    }
    &:where(:not([data-rac])):focus-visible {
      outline-color: var(--color-focus-ring);
    }
  }
  .focus-visible\:ring-inset {
    &:where([data-rac])[data-focus-visible] {
      --tw-ring-inset: inset;
    }
    &:where(:not([data-rac])):focus-visible {
      --tw-ring-inset: inset;
    }
  }
  .disabled\:cursor-not-allowed {
    &:where([data-rac])[data-disabled] {
      cursor: not-allowed;
    }
    &:where(:not([data-rac])):disabled {
      cursor: not-allowed;
    }
  }
  .disabled\:border-gray-200 {
    &:where([data-rac])[data-disabled] {
      border-color: var(--color-gray-200);
    }
    &:where(:not([data-rac])):disabled {
      border-color: var(--color-gray-200);
    }
  }
  .disabled\:bg-disabled {
    &:where([data-rac])[data-disabled] {
      background-color: var(--background-color-disabled);
    }
    &:where(:not([data-rac])):disabled {
      background-color: var(--background-color-disabled);
    }
  }
  .disabled\:bg-disabled_subtle {
    &:where([data-rac])[data-disabled] {
      background-color: var(--background-color-disabled_subtle);
    }
    &:where(:not([data-rac])):disabled {
      background-color: var(--background-color-disabled_subtle);
    }
  }
  .disabled\:bg-primary {
    &:where([data-rac])[data-disabled] {
      background-color: var(--background-color-primary);
    }
    &:where(:not([data-rac])):disabled {
      background-color: var(--background-color-primary);
    }
  }
  .disabled\:bg-secondary {
    &:where([data-rac])[data-disabled] {
      background-color: var(--background-color-secondary);
    }
    &:where(:not([data-rac])):disabled {
      background-color: var(--background-color-secondary);
    }
  }
  .disabled\:stroke-fg-disabled {
    &:where([data-rac])[data-disabled] {
      stroke: var(--color-fg-disabled);
    }
    &:where(:not([data-rac])):disabled {
      stroke: var(--color-fg-disabled);
    }
  }
  .disabled\:text-disabled {
    &:where([data-rac])[data-disabled] {
      color: var(--text-color-disabled);
    }
    &:where(:not([data-rac])):disabled {
      color: var(--text-color-disabled);
    }
  }
  .disabled\:text-fg-disabled {
    &:where([data-rac])[data-disabled] {
      color: var(--color-fg-disabled);
    }
    &:where(:not([data-rac])):disabled {
      color: var(--color-fg-disabled);
    }
  }
  .disabled\:text-fg-disabled_subtle {
    &:where([data-rac])[data-disabled] {
      color: var(--color-fg-disabled_subtle);
    }
    &:where(:not([data-rac])):disabled {
      color: var(--color-fg-disabled_subtle);
    }
  }
  .disabled\:text-gray-200 {
    &:where([data-rac])[data-disabled] {
      color: var(--color-gray-200);
    }
    &:where(:not([data-rac])):disabled {
      color: var(--color-gray-200);
    }
  }
  .disabled\:opacity-40 {
    &:where([data-rac])[data-disabled] {
      opacity: 40%;
    }
    &:where(:not([data-rac])):disabled {
      opacity: 40%;
    }
  }
  .disabled\:shadow-xs {
    &:where([data-rac])[data-disabled] {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
    &:where(:not([data-rac])):disabled {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .disabled\:ring-disabled_subtle {
    &:where([data-rac])[data-disabled] {
      --tw-ring-color: var(--ring-color-disabled_subtle);
    }
    &:where(:not([data-rac])):disabled {
      --tw-ring-color: var(--ring-color-disabled_subtle);
    }
  }
  .disabled\:\*\:text-fg-disabled {
    &:where([data-rac])[data-disabled] {
      :is(& > *) {
        color: var(--color-fg-disabled);
      }
    }
    &:where(:not([data-rac])):disabled {
      :is(& > *) {
        color: var(--color-fg-disabled);
      }
    }
  }
  .disabled\:placeholder\:text-disabled {
    &:where([data-rac])[data-disabled] {
      &::placeholder {
        color: var(--text-color-disabled);
      }
    }
    &:where(:not([data-rac])):disabled {
      &::placeholder {
        color: var(--text-color-disabled);
      }
    }
  }
  .disabled\:hover\:bg-transparent {
    &:where([data-rac])[data-disabled] {
      &:where([data-rac])[data-hovered] {
        background-color: transparent;
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          background-color: transparent;
        }
      }
    }
    &:where(:not([data-rac])):disabled {
      &:where([data-rac])[data-hovered] {
        background-color: transparent;
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          background-color: transparent;
        }
      }
    }
  }
  .disabled\:hover\:text-tertiary {
    &:where([data-rac])[data-disabled] {
      &:where([data-rac])[data-hovered] {
        color: var(--text-color-tertiary);
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          color: var(--text-color-tertiary);
        }
      }
    }
    &:where(:not([data-rac])):disabled {
      &:where([data-rac])[data-hovered] {
        color: var(--text-color-tertiary);
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          color: var(--text-color-tertiary);
        }
      }
    }
  }
  .in-aria-expanded\:-rotate-180 {
    :where(*[aria-expanded="true"]) & {
      rotate: calc(180deg * -1);
    }
  }
  .in-data-input-wrapper\:right-0 {
    :where(*[data-input-wrapper]) & {
      right: calc(var(--spacing) * 0);
    }
  }
  .in-data-input-wrapper\:flex {
    :where(*[data-input-wrapper]) & {
      display: flex;
    }
  }
  .in-data-input-wrapper\:size-4 {
    :where(*[data-input-wrapper]) & {
      width: calc(var(--spacing) * 4);
      height: calc(var(--spacing) * 4);
    }
  }
  .in-data-input-wrapper\:h-full {
    :where(*[data-input-wrapper]) & {
      height: 100%;
    }
  }
  .in-data-input-wrapper\:w-max {
    :where(*[data-input-wrapper]) & {
      width: max-content;
    }
  }
  .in-data-input-wrapper\:gap-1 {
    :where(*[data-input-wrapper]) & {
      gap: calc(var(--spacing) * 1);
    }
  }
  .in-data-input-wrapper\:gap-1\.5 {
    :where(*[data-input-wrapper]) & {
      gap: calc(var(--spacing) * 1.5);
    }
  }
  .in-data-input-wrapper\:bg-inherit {
    :where(*[data-input-wrapper]) & {
      background-color: inherit;
    }
  }
  .in-data-input-wrapper\:stroke-\[2\.625px\] {
    :where(*[data-input-wrapper]) & {
      stroke-width: 2.625px;
    }
  }
  .in-data-input-wrapper\:px-3 {
    :where(*[data-input-wrapper]) & {
      padding-inline: calc(var(--spacing) * 3);
    }
  }
  .in-data-input-wrapper\:px-3\.5 {
    :where(*[data-input-wrapper]) & {
      padding-inline: calc(var(--spacing) * 3.5);
    }
  }
  .in-data-input-wrapper\:px-4 {
    :where(*[data-input-wrapper]) & {
      padding-inline: calc(var(--spacing) * 4);
    }
  }
  .in-data-input-wrapper\:py-2 {
    :where(*[data-input-wrapper]) & {
      padding-block: calc(var(--spacing) * 2);
    }
  }
  .in-data-input-wrapper\:py-2\.5 {
    :where(*[data-input-wrapper]) & {
      padding-block: calc(var(--spacing) * 2.5);
    }
  }
  .in-data-input-wrapper\:text-md {
    :where(*[data-input-wrapper]) & {
      font-size: var(--text-md);
      line-height: var(--tw-leading, var(--text-md--line-height));
    }
  }
  .in-data-input-wrapper\:font-normal {
    :where(*[data-input-wrapper]) & {
      --tw-font-weight: var(--font-weight-normal);
      font-weight: var(--font-weight-normal);
    }
  }
  .in-data-input-wrapper\:text-tertiary {
    :where(*[data-input-wrapper]) & {
      color: var(--text-color-tertiary);
    }
  }
  .in-data-input-wrapper\:shadow-none {
    :where(*[data-input-wrapper]) & {
      --tw-shadow: 0 0 #0000;
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .in-data-input-wrapper\:shadow-xs {
    :where(*[data-input-wrapper]) & {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .in-data-input-wrapper\:ring-transparent {
    :where(*[data-input-wrapper]) & {
      --tw-ring-color: transparent;
    }
  }
  .in-data-input-wrapper\:group-disabled\:pointer-events-none {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        pointer-events: none;
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        pointer-events: none;
      }
    }
  }
  .in-data-input-wrapper\:group-disabled\:cursor-not-allowed {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        cursor: not-allowed;
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        cursor: not-allowed;
      }
    }
  }
  .in-data-input-wrapper\:group-disabled\:bg-disabled_subtle {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        background-color: var(--background-color-disabled_subtle);
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        background-color: var(--background-color-disabled_subtle);
      }
    }
  }
  .in-data-input-wrapper\:group-disabled\:bg-transparent {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        background-color: transparent;
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        background-color: transparent;
      }
    }
  }
  .in-data-input-wrapper\:group-disabled\:text-disabled {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        color: var(--text-color-disabled);
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        color: var(--text-color-disabled);
      }
    }
  }
  .in-data-input-wrapper\:group-disabled\:ring-border-disabled {
    :where(*[data-input-wrapper]) & {
      &:is(:where(.group):where([data-rac])[data-disabled] *) {
        --tw-ring-color: var(--color-border-disabled);
      }
      &:is(:where(.group):where(:not([data-rac])):disabled *) {
        --tw-ring-color: var(--color-border-disabled);
      }
    }
  }
  .in-data-input-wrapper\:focus\:\!z-50 {
    :where(*[data-input-wrapper]) & {
      &:where([data-rac])[data-focused] {
        z-index: 50 !important;
      }
      &:where(:not([data-rac])):focus {
        z-index: 50 !important;
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:-mr-px {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        margin-right: -1px;
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:rounded-l-lg {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        border-top-left-radius: var(--radius-lg);
        border-bottom-left-radius: var(--radius-lg);
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:rounded-r-none {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        border-top-right-radius: var(--radius-none);
        border-bottom-right-radius: var(--radius-none);
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:before\:rounded-r-none {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        &::before {
          content: var(--tw-content);
          border-top-right-radius: var(--radius-none);
          border-bottom-right-radius: var(--radius-none);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:-ml-px {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        margin-left: -1px;
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:rounded-l-none {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        border-top-left-radius: var(--radius-none);
        border-bottom-left-radius: var(--radius-none);
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:rounded-r-lg {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        border-top-right-radius: var(--radius-lg);
        border-bottom-right-radius: var(--radius-lg);
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:before\:rounded-l-none {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        &::before {
          content: var(--tw-content);
          border-top-left-radius: var(--radius-none);
          border-bottom-left-radius: var(--radius-none);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=md\]\:py-2\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="md"]) & {
        padding-block: calc(var(--spacing) * 2.5);
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=md\]\:pr-3 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="md"]) & {
        padding-right: calc(var(--spacing) * 3);
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=md\]\:pl-3\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="md"]) & {
        padding-left: calc(var(--spacing) * 3.5);
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:in-data-\[input-size\=md\]\:pr-4\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        :where(*[data-input-size="md"]) & {
          padding-right: calc(var(--spacing) * 4.5);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:in-data-\[input-size\=md\]\:pl-3\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        :where(*[data-input-size="md"]) & {
          padding-left: calc(var(--spacing) * 3.5);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:in-data-\[input-size\=md\]\:pr-8 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        :where(*[data-input-size="md"]) & {
          padding-right: calc(var(--spacing) * 8);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=sm\]\:px-3 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="sm"]) & {
        padding-inline: calc(var(--spacing) * 3);
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=sm\]\:py-2 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="sm"]) & {
        padding-block: calc(var(--spacing) * 2);
      }
    }
  }
  .in-data-input-wrapper\:in-data-\[input-size\=sm\]\:pl-3 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-input-size="sm"]) & {
        padding-left: calc(var(--spacing) * 3);
      }
    }
  }
  .in-data-input-wrapper\:in-data-leading\:in-data-\[input-size\=sm\]\:pr-4\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-leading]) & {
        :where(*[data-input-size="sm"]) & {
          padding-right: calc(var(--spacing) * 4.5);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:in-data-\[input-size\=sm\]\:right-3 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        :where(*[data-input-size="sm"]) & {
          right: calc(var(--spacing) * 3);
        }
      }
    }
  }
  .in-data-input-wrapper\:in-data-trailing\:in-data-\[input-size\=sm\]\:pr-7\.5 {
    :where(*[data-input-wrapper]) & {
      :where(*[data-trailing]) & {
        :where(*[data-input-size="sm"]) & {
          padding-right: calc(var(--spacing) * 7.5);
        }
      }
    }
  }
  .in-placement-left\:-rotate-90 {
    :where(*[data-placement="left"]) & {
      rotate: calc(90deg * -1);
    }
  }
  .in-placement-left\:slide-in-from-right-0\.5 {
    :where(*[data-placement="left"]) & {
      --tw-enter-translate-x: 0.125rem;
    }
  }
  .in-placement-left\:slide-out-to-right-0\.5 {
    :where(*[data-placement="left"]) & {
      --tw-exit-translate-x: 0.125rem;
    }
  }
  .in-placement-right\:rotate-90 {
    :where(*[data-placement="right"]) & {
      rotate: 90deg;
    }
  }
  .in-placement-right\:slide-in-from-left-0\.5 {
    :where(*[data-placement="right"]) & {
      --tw-enter-translate-x: -0.125rem;
    }
  }
  .in-placement-right\:slide-out-to-left-0\.5 {
    :where(*[data-placement="right"]) & {
      --tw-exit-translate-x: -0.125rem;
    }
  }
  .in-placement-top\:rotate-0 {
    :where(*[data-placement="top"]) & {
      rotate: 0deg;
    }
  }
  .in-placement-top\:slide-in-from-bottom-0\.5 {
    :where(*[data-placement="top"]) & {
      --tw-enter-translate-y: 0.125rem;
    }
  }
  .in-placement-top\:slide-out-to-bottom-0\.5 {
    :where(*[data-placement="top"]) & {
      --tw-exit-translate-y: 0.125rem;
    }
  }
  .in-placement-bottom\:rotate-180 {
    :where(*[data-placement="bottom"]) & {
      rotate: 180deg;
    }
  }
  .in-placement-bottom\:slide-in-from-top-0\.5 {
    :where(*[data-placement="bottom"]) & {
      --tw-enter-translate-y: -0.125rem;
    }
  }
  .in-placement-bottom\:slide-out-to-top-0\.5 {
    :where(*[data-placement="bottom"]) & {
      --tw-exit-translate-y: -0.125rem;
    }
  }
  .in-\[\[role\=gridcell\]\:first-child\]\:after\:hidden {
    :where(*:is([role=gridcell]:first-child)) & {
      &::after {
        content: var(--tw-content);
        display: none;
      }
    }
  }
  .in-\[\[role\=gridcell\]\:last-child\]\:after\:hidden {
    :where(*:is([role=gridcell]:last-child)) & {
      &::after {
        content: var(--tw-content);
        display: none;
      }
    }
  }
  .has-aria-expanded\:bg-primary {
    &:has(*[aria-expanded="true"]) {
      background-color: var(--background-color-primary);
    }
  }
  .has-\[\&\>select\]\:bg-disabled_subtle {
    &:has(*>select) {
      background-color: var(--background-color-disabled_subtle);
    }
  }
  .has-\[\&\>select\]\:shadow-xs {
    &:has(*>select) {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .has-\[\&\>select\]\:ring-1 {
    &:has(*>select) {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .has-\[\&\>select\]\:ring-border-disabled {
    &:has(*>select) {
      --tw-ring-color: var(--color-border-disabled);
    }
  }
  .has-\[\&\>select\]\:ring-border-error_subtle {
    &:has(*>select) {
      --tw-ring-color: var(--color-border-error_subtle);
    }
  }
  .has-\[\&\>select\]\:ring-border-primary {
    &:has(*>select) {
      --tw-ring-color: var(--color-border-primary);
    }
  }
  .has-\[\&\>select\]\:ring-inset {
    &:has(*>select) {
      --tw-ring-inset: inset;
    }
  }
  .has-\[\&\>select\]\:has-\[input\:focus\]\:ring-2 {
    &:has(*>select) {
      &:has(*:is(input:focus)) {
        --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
        box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
      }
    }
  }
  .has-\[\&\>select\]\:has-\[input\:focus\]\:ring-border-brand {
    &:has(*>select) {
      &:has(*:is(input:focus)) {
        --tw-ring-color: var(--color-border-brand);
      }
    }
  }
  .has-\[\&\>select\]\:has-\[input\:focus\]\:ring-border-error {
    &:has(*>select) {
      &:has(*:is(input:focus)) {
        --tw-ring-color: var(--color-border-error);
      }
    }
  }
  .\*\:data-icon\:pointer-events-none {
    :is(& > *) {
      &[data-icon] {
        pointer-events: none;
      }
    }
  }
  .\*\:data-icon\:size-4 {
    :is(& > *) {
      &[data-icon] {
        width: calc(var(--spacing) * 4);
        height: calc(var(--spacing) * 4);
      }
    }
  }
  .\*\:data-icon\:size-5 {
    :is(& > *) {
      &[data-icon] {
        width: calc(var(--spacing) * 5);
        height: calc(var(--spacing) * 5);
      }
    }
  }
  .\*\:data-icon\:size-6 {
    :is(& > *) {
      &[data-icon] {
        width: calc(var(--spacing) * 6);
        height: calc(var(--spacing) * 6);
      }
    }
  }
  .\*\:data-icon\:size-7 {
    :is(& > *) {
      &[data-icon] {
        width: calc(var(--spacing) * 7);
        height: calc(var(--spacing) * 7);
      }
    }
  }
  .\*\:data-icon\:shrink-0 {
    :is(& > *) {
      &[data-icon] {
        flex-shrink: 0;
      }
    }
  }
  .\*\:data-icon\:text-button-destructive-primary-icon {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-button-destructive-primary-icon);
      }
    }
  }
  .\*\:data-icon\:text-button-primary-icon {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-button-primary-icon);
      }
    }
  }
  .\*\:data-icon\:text-current {
    :is(& > *) {
      &[data-icon] {
        color: currentcolor;
      }
    }
  }
  .\*\:data-icon\:text-fg-brand-secondary_alt {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-fg-brand-secondary_alt);
      }
    }
  }
  .\*\:data-icon\:text-fg-disabled {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-fg-disabled);
      }
    }
  }
  .\*\:data-icon\:text-fg-error-secondary {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-fg-error-secondary);
      }
    }
  }
  .\*\:data-icon\:text-fg-quaternary {
    :is(& > *) {
      &[data-icon] {
        color: var(--color-fg-quaternary);
      }
    }
  }
  .\*\:data-icon\:transition-inherit-all {
    :is(& > *) {
      &[data-icon] {
        transition-property: inherit;
        transition-duration: inherit;
        transition-timing-function: inherit;
      }
    }
  }
  .hover\:\*\:data-icon\:text-button-destructive-primary-icon_hover {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-button-destructive-primary-icon_hover);
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-icon] {
            color: var(--color-button-destructive-primary-icon_hover);
          }
        }
      }
    }
  }
  .hover\:\*\:data-icon\:text-button-primary-icon_hover {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-button-primary-icon_hover);
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-icon] {
            color: var(--color-button-primary-icon_hover);
          }
        }
      }
    }
  }
  .hover\:\*\:data-icon\:text-fg-brand-secondary_hover {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-brand-secondary_hover);
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-icon] {
            color: var(--color-fg-brand-secondary_hover);
          }
        }
      }
    }
  }
  .hover\:\*\:data-icon\:text-fg-error-primary {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-error-primary);
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-icon] {
            color: var(--color-fg-error-primary);
          }
        }
      }
    }
  }
  .hover\:\*\:data-icon\:text-fg-quaternary_hover {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-quaternary_hover);
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-icon] {
            color: var(--color-fg-quaternary_hover);
          }
        }
      }
    }
  }
  .disabled\:\*\:data-icon\:text-fg-disabled_subtle {
    &:where([data-rac])[data-disabled] {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-disabled_subtle);
        }
      }
    }
    &:where(:not([data-rac])):disabled {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-disabled_subtle);
        }
      }
    }
  }
  .in-disabled\:\*\:data-icon\:text-fg-disabled {
    :where(*:where([data-rac])[data-disabled]) & {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-disabled);
        }
      }
    }
    :where(*:where(:not([data-rac])):disabled) & {
      :is(& > *) {
        &[data-icon] {
          color: var(--color-fg-disabled);
        }
      }
    }
  }
  .data-icon-leading\:pl-3 {
    &[data-icon-leading] {
      padding-left: calc(var(--spacing) * 3);
    }
  }
  .data-icon-leading\:pl-3\.5 {
    &[data-icon-leading] {
      padding-left: calc(var(--spacing) * 3.5);
    }
  }
  .data-icon-leading\:pl-4 {
    &[data-icon-leading] {
      padding-left: calc(var(--spacing) * 4);
    }
  }
  .data-icon-only\:p-2 {
    &[data-icon-only] {
      padding: calc(var(--spacing) * 2);
    }
  }
  .data-icon-only\:p-2\.5 {
    &[data-icon-only] {
      padding: calc(var(--spacing) * 2.5);
    }
  }
  .data-icon-only\:p-3 {
    &[data-icon-only] {
      padding: calc(var(--spacing) * 3);
    }
  }
  .data-icon-only\:p-3\.5 {
    &[data-icon-only] {
      padding: calc(var(--spacing) * 3.5);
    }
  }
  .data-icon-only\:p-4 {
    &[data-icon-only] {
      padding: calc(var(--spacing) * 4);
    }
  }
  .data-icon-only\:px-3 {
    &[data-icon-only] {
      padding-inline: calc(var(--spacing) * 3);
    }
  }
  .in-data-input-wrapper\:data-icon-only\:p-2\.5 {
    :where(*[data-input-wrapper]) & {
      &[data-icon-only] {
        padding: calc(var(--spacing) * 2.5);
      }
    }
  }
  .in-data-input-wrapper\:data-icon-only\:p-3 {
    :where(*[data-input-wrapper]) & {
      &[data-icon-only] {
        padding: calc(var(--spacing) * 3);
      }
    }
  }
  .data-loading\:bg-brand-solid_hover {
    &[data-loading] {
      background-color: var(--background-color-brand-solid_hover);
    }
  }
  .data-loading\:bg-error-primary {
    &[data-loading] {
      background-color: var(--background-color-error-primary);
    }
  }
  .data-loading\:bg-error-solid_hover {
    &[data-loading] {
      background-color: var(--background-color-error-solid_hover);
    }
  }
  .data-loading\:bg-primary_hover {
    &[data-loading] {
      background-color: var(--background-color-primary_hover);
    }
  }
  .\*\:data-text\:underline {
    :is(& > *) {
      &[data-text] {
        text-decoration-line: underline;
      }
    }
  }
  .\*\:data-text\:decoration-transparent {
    :is(& > *) {
      &[data-text] {
        text-decoration-color: transparent;
      }
    }
  }
  .\*\:data-text\:underline-offset-2 {
    :is(& > *) {
      &[data-text] {
        text-underline-offset: 2px;
      }
    }
  }
  .hover\:\*\:data-text\:decoration-current {
    &:where([data-rac])[data-hovered] {
      :is(& > *) {
        &[data-text] {
          text-decoration-color: currentcolor;
        }
      }
    }
    @media (hover: hover) {
      &:where(:not([data-rac])):hover {
        :is(& > *) {
          &[data-text] {
            text-decoration-color: currentcolor;
          }
        }
      }
    }
  }
  .data-\[selected\]\:bg-brand-primary_alt {
    &[data-selected] {
      background-color: var(--background-color-brand-primary_alt);
    }
  }
  .data-\[selected\]\:font-semibold {
    &[data-selected] {
      --tw-font-weight: var(--font-weight-semibold);
      font-weight: var(--font-weight-semibold);
    }
  }
  .data-\[selected\]\:text-brand-secondary {
    &[data-selected] {
      color: var(--text-color-brand-secondary);
    }
  }
  .data-\[selected\]\:shadow-xs {
    &[data-selected] {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .data-\[selected\]\:ring-1 {
    &[data-selected] {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .data-\[selected\]\:ring-brand_alt {
    &[data-selected] {
      --tw-ring-color: var(--ring-color-brand_alt);
    }
  }
  .nth-2\:pl-3 {
    &:nth-child(2) {
      padding-left: calc(var(--spacing) * 3);
    }
  }
  .max-lg\:hidden {
    @media (width < 64rem) {
      display: none;
    }
  }
  .max-md\:hidden {
    @media (width < 48rem) {
      display: none;
    }
  }
  .max-md\:has-aria-expanded\:bg-primary {
    @media (width < 48rem) {
      &:has(*[aria-expanded="true"]) {
        background-color: var(--background-color-primary);
      }
    }
  }
  .max-sm\:overflow-y-auto {
    @media (width < 40rem) {
      overflow-y: auto;
    }
  }
  .max-sm\:rounded-xl {
    @media (width < 40rem) {
      border-radius: var(--radius-xl);
    }
  }
  .sm\:m-auto {
    @media (width >= 40rem) {
      margin: auto;
    }
  }
  .sm\:w-auto {
    @media (width >= 40rem) {
      width: auto;
    }
  }
  .sm\:max-w-80 {
    @media (width >= 40rem) {
      max-width: calc(var(--spacing) * 80);
    }
  }
  .sm\:grid-cols-2 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .sm\:grid-cols-3 {
    @media (width >= 40rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  .sm\:flex-row {
    @media (width >= 40rem) {
      flex-direction: row;
    }
  }
  .sm\:items-center {
    @media (width >= 40rem) {
      align-items: center;
    }
  }
  .sm\:justify-center {
    @media (width >= 40rem) {
      justify-content: center;
    }
  }
  .sm\:gap-8 {
    @media (width >= 40rem) {
      gap: calc(var(--spacing) * 8);
    }
  }
  .sm\:p-0 {
    @media (width >= 40rem) {
      padding: calc(var(--spacing) * 0);
    }
  }
  .sm\:p-3 {
    @media (width >= 40rem) {
      padding: calc(var(--spacing) * 3);
    }
  }
  .sm\:p-8 {
    @media (width >= 40rem) {
      padding: calc(var(--spacing) * 8);
    }
  }
  .md\:col-span-1 {
    @media (width >= 48rem) {
      grid-column: span 1 / span 1;
    }
  }
  .md\:col-span-2 {
    @media (width >= 48rem) {
      grid-column: span 2 / span 2;
    }
  }
  .md\:mb-0 {
    @media (width >= 48rem) {
      margin-bottom: calc(var(--spacing) * 0);
    }
  }
  .md\:block {
    @media (width >= 48rem) {
      display: block;
    }
  }
  .md\:flex {
    @media (width >= 48rem) {
      display: flex;
    }
  }
  .md\:hidden {
    @media (width >= 48rem) {
      display: none;
    }
  }
  .md\:inline-block {
    @media (width >= 48rem) {
      display: inline-block;
    }
  }
  .md\:h-18 {
    @media (width >= 48rem) {
      height: calc(var(--spacing) * 18);
    }
  }
  .md\:h-19 {
    @media (width >= 48rem) {
      height: calc(var(--spacing) * 19);
    }
  }
  .md\:h-20 {
    @media (width >= 48rem) {
      height: calc(var(--spacing) * 20);
    }
  }
  .md\:h-\[calc\(100dvh-260px\)\] {
    @media (width >= 48rem) {
      height: calc(100dvh - 260px);
    }
  }
  .md\:min-h-\[calc\(100dvh-260px\)\] {
    @media (width >= 48rem) {
      min-height: calc(100dvh - 260px);
    }
  }
  .md\:w-28 {
    @media (width >= 48rem) {
      width: calc(var(--spacing) * 28);
    }
  }
  .md\:w-40 {
    @media (width >= 48rem) {
      width: calc(var(--spacing) * 40);
    }
  }
  .md\:w-auto {
    @media (width >= 48rem) {
      width: auto;
    }
  }
  .md\:max-w-84 {
    @media (width >= 48rem) {
      max-width: calc(var(--spacing) * 84);
    }
  }
  .md\:grid-cols-2 {
    @media (width >= 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .md\:grid-cols-3 {
    @media (width >= 48rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  .md\:grid-cols-4 {
    @media (width >= 48rem) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  .md\:flex-row {
    @media (width >= 48rem) {
      flex-direction: row;
    }
  }
  .md\:items-center {
    @media (width >= 48rem) {
      align-items: center;
    }
  }
  .md\:items-start {
    @media (width >= 48rem) {
      align-items: flex-start;
    }
  }
  .md\:items-stretch {
    @media (width >= 48rem) {
      align-items: stretch;
    }
  }
  .md\:justify-between {
    @media (width >= 48rem) {
      justify-content: space-between;
    }
  }
  .md\:justify-end {
    @media (width >= 48rem) {
      justify-content: flex-end;
    }
  }
  .md\:justify-start {
    @media (width >= 48rem) {
      justify-content: flex-start;
    }
  }
  .md\:gap-4 {
    @media (width >= 48rem) {
      gap: calc(var(--spacing) * 4);
    }
  }
  .md\:gap-6 {
    @media (width >= 48rem) {
      gap: calc(var(--spacing) * 6);
    }
  }
  .md\:gap-12 {
    @media (width >= 48rem) {
      gap: calc(var(--spacing) * 12);
    }
  }
  .md\:rounded-2xl {
    @media (width >= 48rem) {
      border-radius: var(--radius-2xl);
    }
  }
  .md\:rounded-lg {
    @media (width >= 48rem) {
      border-radius: var(--radius-lg);
    }
  }
  .md\:border-r {
    @media (width >= 48rem) {
      border-right-style: var(--tw-border-style);
      border-right-width: 1px;
    }
  }
  .md\:bg-primary {
    @media (width >= 48rem) {
      background-color: var(--background-color-primary);
    }
  }
  .md\:p-0 {
    @media (width >= 48rem) {
      padding: calc(var(--spacing) * 0);
    }
  }
  .md\:p-2 {
    @media (width >= 48rem) {
      padding: calc(var(--spacing) * 2);
    }
  }
  .md\:px-5 {
    @media (width >= 48rem) {
      padding-inline: calc(var(--spacing) * 5);
    }
  }
  .md\:px-6 {
    @media (width >= 48rem) {
      padding-inline: calc(var(--spacing) * 6);
    }
  }
  .md\:px-8 {
    @media (width >= 48rem) {
      padding-inline: calc(var(--spacing) * 8);
    }
  }
  .md\:py-3 {
    @media (width >= 48rem) {
      padding-block: calc(var(--spacing) * 3);
    }
  }
  .md\:py-24 {
    @media (width >= 48rem) {
      padding-block: calc(var(--spacing) * 24);
    }
  }
  .md\:pt-3 {
    @media (width >= 48rem) {
      padding-top: calc(var(--spacing) * 3);
    }
  }
  .md\:pt-5 {
    @media (width >= 48rem) {
      padding-top: calc(var(--spacing) * 5);
    }
  }
  .md\:pr-3 {
    @media (width >= 48rem) {
      padding-right: calc(var(--spacing) * 3);
    }
  }
  .md\:pb-4 {
    @media (width >= 48rem) {
      padding-bottom: calc(var(--spacing) * 4);
    }
  }
  .md\:pl-4 {
    @media (width >= 48rem) {
      padding-left: calc(var(--spacing) * 4);
    }
  }
  .md\:pl-5 {
    @media (width >= 48rem) {
      padding-left: calc(var(--spacing) * 5);
    }
  }
  .md\:pl-6 {
    @media (width >= 48rem) {
      padding-left: calc(var(--spacing) * 6);
    }
  }
  .md\:pl-10 {
    @media (width >= 48rem) {
      padding-left: calc(var(--spacing) * 10);
    }
  }
  .md\:text-display-lg {
    @media (width >= 48rem) {
      font-size: var(--text-display-lg);
      line-height: var(--tw-leading, var(--text-display-lg--line-height));
      letter-spacing: var(--tw-tracking, var(--text-display-lg--letter-spacing));
    }
  }
  .md\:text-3xl {
    @media (width >= 48rem) {
      font-size: var(--text-3xl);
      line-height: var(--tw-leading, var(--text-3xl--line-height));
    }
  }
  .md\:text-xl {
    @media (width >= 48rem) {
      font-size: var(--text-xl);
      line-height: var(--tw-leading, var(--text-xl--line-height));
    }
  }
  .md\:shadow-lg {
    @media (width >= 48rem) {
      --tw-shadow: 0px 12px 16px -4px var(--tw-shadow-color, rgba(10, 13, 18, 0.08)), 0px 4px 6px -2px var(--tw-shadow-color, rgba(10, 13, 18, 0.03)), 0px 2px 2px -1px var(--tw-shadow-color, rgba(10, 13, 18, 0.04));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .md\:shadow-xs {
    @media (width >= 48rem) {
      --tw-shadow: 0px 1px 2px var(--tw-shadow-color, rgba(10, 13, 18, 0.05));
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .md\:ring-1 {
    @media (width >= 48rem) {
      --tw-ring-shadow: var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color, currentcolor);
      box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
    }
  }
  .md\:max-lg\:hidden {
    @media (width >= 48rem) {
      @media (width < 64rem) {
        display: none;
      }
    }
  }
  .lg\:fixed {
    @media (width >= 64rem) {
      position: fixed;
    }
  }
  .lg\:sticky {
    @media (width >= 64rem) {
      position: sticky;
    }
  }
  .lg\:inset-y-0 {
    @media (width >= 64rem) {
      inset-block: calc(var(--spacing) * 0);
    }
  }
  .lg\:top-0 {
    @media (width >= 64rem) {
      top: calc(var(--spacing) * 0);
    }
  }
  .lg\:bottom-0 {
    @media (width >= 64rem) {
      bottom: calc(var(--spacing) * 0);
    }
  }
  .lg\:left-0 {
    @media (width >= 64rem) {
      left: calc(var(--spacing) * 0);
    }
  }
  .lg\:col-span-1 {
    @media (width >= 64rem) {
      grid-column: span 1 / span 1;
    }
  }
  .lg\:col-span-2 {
    @media (width >= 64rem) {
      grid-column: span 2 / span 2;
    }
  }
  .lg\:block {
    @media (width >= 64rem) {
      display: block;
    }
  }
  .lg\:flex {
    @media (width >= 64rem) {
      display: flex;
    }
  }
  .lg\:hidden {
    @media (width >= 64rem) {
      display: none;
    }
  }
  .lg\:w-\(--width\) {
    @media (width >= 64rem) {
      width: var(--width);
    }
  }
  .lg\:w-full {
    @media (width >= 64rem) {
      width: 100%;
    }
  }
  .lg\:grid-cols-2 {
    @media (width >= 64rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
  .lg\:grid-cols-3 {
    @media (width >= 64rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  .lg\:grid-cols-4 {
    @media (width >= 64rem) {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
  }
  .lg\:justify-around {
    @media (width >= 64rem) {
      justify-content: space-around;
    }
  }
  .lg\:gap-6 {
    @media (width >= 64rem) {
      gap: calc(var(--spacing) * 6);
    }
  }
  .lg\:overflow-x-visible {
    @media (width >= 64rem) {
      overflow-x: visible;
    }
  }
  .lg\:rounded-xl {
    @media (width >= 64rem) {
      border-radius: var(--radius-xl);
    }
  }
  .lg\:border {
    @media (width >= 64rem) {
      border-style: var(--tw-border-style);
      border-width: 1px;
    }
  }
  .lg\:px-4 {
    @media (width >= 64rem) {
      padding-inline: calc(var(--spacing) * 4);
    }
  }
  .lg\:px-5 {
    @media (width >= 64rem) {
      padding-inline: calc(var(--spacing) * 5);
    }
  }
  .lg\:py-1 {
    @media (width >= 64rem) {
      padding-block: calc(var(--spacing) * 1);
    }
  }
  .lg\:py-4 {
    @media (width >= 64rem) {
      padding-block: calc(var(--spacing) * 4);
    }
  }
  .lg\:py-6 {
    @media (width >= 64rem) {
      padding-block: calc(var(--spacing) * 6);
    }
  }
  .lg\:pt-5 {
    @media (width >= 64rem) {
      padding-top: calc(var(--spacing) * 5);
    }
  }
  .lg\:pt-6 {
    @media (width >= 64rem) {
      padding-top: calc(var(--spacing) * 6);
    }
  }
  .lg\:pl-1 {
    @media (width >= 64rem) {
      padding-left: calc(var(--spacing) * 1);
    }
  }
  .lg\:text-display-xl {
    @media (width >= 64rem) {
      font-size: var(--text-display-xl);
      line-height: var(--tw-leading, var(--text-display-xl--line-height));
      letter-spacing: var(--tw-tracking, var(--text-display-xl--letter-spacing));
    }
  }
  .lg\:\*\*\:data-label\:hidden {
    @media (width >= 64rem) {
      :is(& *) {
        &[data-label] {
          display: none;
        }
      }
    }
  }
  .xl\:grid-cols-5 {
    @media (width >= 80rem) {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }
  .dark\:hidden {
    &:where(.dark-mode, .dark-mode *) {
      display: none;
    }
  }
  .dark\:border-gray-700 {
    &:where(.dark-mode, .dark-mode *) {
      border-color: var(--color-gray-700);
    }
  }
  .dark\:border-gray-800 {
    &:where(.dark-mode, .dark-mode *) {
      border-color: var(--color-gray-800);
    }
  }
  .dark\:border-primary {
    &:where(.dark-mode, .dark-mode *) {
      border-color: var(--border-color-primary);
    }
  }
  .dark\:bg-\[\#0B0D12\] {
    &:where(.dark-mode, .dark-mode *) {
      background-color: #0B0D12;
    }
  }
  .dark\:bg-\[\#111318\] {
    &:where(.dark-mode, .dark-mode *) {
      background-color: #111318;
    }
  }
  .dark\:bg-gray-800 {
    &:where(.dark-mode, .dark-mode *) {
      background-color: var(--color-gray-800);
    }
  }
  .dark\:bg-gray-800\/50 {
    &:where(.dark-mode, .dark-mode *) {
      background-color: color-mix(in srgb, rgb(37 43 55) 50%, transparent);
      @supports (color: color-mix(in lab, red, red)) {
        background-color: color-mix(in oklab, var(--color-gray-800) 50%, transparent);
      }
    }
  }
  .dark\:bg-gray-900 {
    &:where(.dark-mode, .dark-mode *) {
      background-color: var(--color-gray-900);
    }
  }
  .dark\:text-fg-white {
    &:where(.dark-mode, .dark-mode *) {
      color: var(--color-fg-white);
    }
  }
  .dark\:text-gray-100 {
    &:where(.dark-mode, .dark-mode *) {
      color: var(--color-gray-100);
    }
  }
  .dark\:text-gray-200 {
    &:where(.dark-mode, .dark-mode *) {
      color: var(--color-gray-200);
    }
  }
  .dark\:text-gray-400 {
    &:where(.dark-mode, .dark-mode *) {
      color: var(--color-gray-400);
    }
  }
  .dark\:text-white {
    &:where(.dark-mode, .dark-mode *) {
      color: var(--color-white);
    }
  }
  .dark\:hover\:border-primary {
    &:where(.dark-mode, .dark-mode *) {
      &:where([data-rac])[data-hovered] {
        border-color: var(--border-color-primary);
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          border-color: var(--border-color-primary);
        }
      }
    }
  }
  .dark\:hover\:border-primary\/50 {
    &:where(.dark-mode, .dark-mode *) {
      &:where([data-rac])[data-hovered] {
        border-color: color-mix(in srgb, rgb(213 215 218) 50%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          border-color: color-mix(in oklab, var(--border-color-primary) 50%, transparent);
        }
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          border-color: color-mix(in srgb, rgb(213 215 218) 50%, transparent);
          @supports (color: color-mix(in lab, red, red)) {
            border-color: color-mix(in oklab, var(--border-color-primary) 50%, transparent);
          }
        }
      }
    }
  }
  .dark\:hover\:bg-\[\#111318\] {
    &:where(.dark-mode, .dark-mode *) {
      &:where([data-rac])[data-hovered] {
        background-color: #111318;
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          background-color: #111318;
        }
      }
    }
  }
  .dark\:hover\:bg-white\/10 {
    &:where(.dark-mode, .dark-mode *) {
      &:where([data-rac])[data-hovered] {
        background-color: color-mix(in srgb, rgb(255 255 255) 10%, transparent);
        @supports (color: color-mix(in lab, red, red)) {
          background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
        }
      }
      @media (hover: hover) {
        &:where(:not([data-rac])):hover {
          background-color: color-mix(in srgb, rgb(255 255 255) 10%, transparent);
          @supports (color: color-mix(in lab, red, red)) {
            background-color: color-mix(in oklab, var(--color-white) 10%, transparent);
          }
        }
      }
    }
  }
  .placement-right\:slide-in-from-left-0\.5 {
    &[data-placement="right"] {
      --tw-enter-translate-x: -0.125rem;
    }
  }
  .placement-right\:slide-in-from-left-2 {
    &[data-placement="right"] {
      --tw-enter-translate-x: -0.5rem;
    }
  }
  .placement-right\:slide-out-to-left-0\.5 {
    &[data-placement="right"] {
      --tw-exit-translate-x: -0.125rem;
    }
  }
  .placement-right\:slide-out-to-left-2 {
    &[data-placement="right"] {
      --tw-exit-translate-x: -0.5rem;
    }
  }
  .placement-top\:slide-in-from-bottom-0\.5 {
    &[data-placement="top"] {
      --tw-enter-translate-y: 0.125rem;
    }
  }
  .placement-top\:slide-in-from-bottom-2 {
    &[data-placement="top"] {
      --tw-enter-translate-y: 0.5rem;
    }
  }
  .placement-top\:slide-out-to-bottom-0\.5 {
    &[data-placement="top"] {
      --tw-exit-translate-y: 0.125rem;
    }
  }
  .placement-top\:slide-out-to-bottom-2 {
    &[data-placement="top"] {
      --tw-exit-translate-y: 0.5rem;
    }
  }
  .placement-bottom\:slide-in-from-top-0\.5 {
    &[data-placement="bottom"] {
      --tw-enter-translate-y: -0.125rem;
    }
  }
  .placement-bottom\:slide-in-from-top-2 {
    &[data-placement="bottom"] {
      --tw-enter-translate-y: -0.5rem;
    }
  }
  .placement-bottom\:slide-out-to-top-0\.5 {
    &[data-placement="bottom"] {
      --tw-exit-translate-y: -0.125rem;
    }
  }
  .placement-bottom\:slide-out-to-top-2 {
    &[data-placement="bottom"] {
      --tw-exit-translate-y: -0.5rem;
    }
  }
  .pressed\:bg-primary_hover {
    &[data-pressed] {
      background-color: var(--background-color-primary_hover);
    }
  }
  .pressed\:text-fg-quaternary_hover {
    &[data-pressed] {
      color: var(--color-fg-quaternary_hover);
    }
  }
  .selected\:bg-active {
    &[data-selected] {
      background-color: var(--background-color-active);
    }
  }
  .selected\:bg-secondary {
    &[data-selected] {
      background-color: var(--background-color-secondary);
    }
  }
  .selected\:text-secondary_hover {
    &[data-selected] {
      color: var(--text-color-secondary_hover);
    }
  }
  .selected\:disabled\:bg-disabled_subtle {
    &[data-selected] {
      &:where([data-rac])[data-disabled] {
        background-color: var(--background-color-disabled_subtle);
      }
      &:where(:not([data-rac])):disabled {
        background-color: var(--background-color-disabled_subtle);
      }
    }
  }
  .lg\:label\:hidden {
    @media (width >= 64rem) {
      & [data-label] {
        display: none;
      }
    }
  }
  .\[\&_td\]\:p-0 {
    & td {
      padding: calc(var(--spacing) * 0);
    }
  }
  .\[\&_tr\]\:border-b-4 {
    & tr {
      border-bottom-style: var(--tw-border-style);
      border-bottom-width: 4px;
    }
  }
  .\[\&_tr\]\:border-transparent {
    & tr {
      border-color: transparent;
    }
  }
  .\[\&_tr\:last-of-type\]\:border-none {
    & tr:last-of-type {
      --tw-border-style: none;
      border-style: none;
    }
  }
  .\[\&\:\:-webkit-resizer\]\:bg-\(image\:--resize-handle-bg\) {
    &::-webkit-resizer {
      background-image: var(--resize-handle-bg);
    }
  }
  .\[\&\:\:-webkit-resizer\]\:bg-contain {
    &::-webkit-resizer {
      background-size: contain;
    }
  }
  .dark\:\[\&\:\:-webkit-resizer\]\:bg-\(image\:--resize-handle-bg-dark\) {
    &:where(.dark-mode, .dark-mode *) {
      &::-webkit-resizer {
        background-image: var(--resize-handle-bg-dark);
      }
    }
  }
  .\[\&\>\*\:not\(\[data-icon\=loading\]\)\]\:invisible {
    &>*:not([data-icon=loading]) {
      visibility: hidden;
    }
  }
  .\[\&\>\*\:not\(\[data-icon\=loading\]\)\:not\(\[data-text\]\)\]\:hidden {
    &>*:not([data-icon=loading]):not([data-text]) {
      display: none;
    }
  }
  .\[\&\>td\]\:after\:absolute {
    &>td {
      &::after {
        content: var(--tw-content);
        position: absolute;
      }
    }
  }
  .\[\&\>td\]\:after\:inset-x-0 {
    &>td {
      &::after {
        content: var(--tw-content);
        inset-inline: calc(var(--spacing) * 0);
      }
    }
  }
  .\[\&\>td\]\:after\:bottom-0 {
    &>td {
      &::after {
        content: var(--tw-content);
        bottom: calc(var(--spacing) * 0);
      }
    }
  }
  .\[\&\>td\]\:after\:h-px {
    &>td {
      &::after {
        content: var(--tw-content);
        height: 1px;
      }
    }
  }
  .\[\&\>td\]\:after\:w-full {
    &>td {
      &::after {
        content: var(--tw-content);
        width: 100%;
      }
    }
  }
  .\[\&\>td\]\:after\:bg-border-secondary {
    &>td {
      &::after {
        content: var(--tw-content);
        background-color: var(--color-border-secondary);
      }
    }
  }
  .last\:\[\&\>td\]\:after\:hidden {
    &:last-child {
      &>td {
        &::after {
          content: var(--tw-content);
          display: none;
        }
      }
    }
  }
  .\[\&\>td\]\:focus-visible\:after\:opacity-0 {
    &>td {
      &:where([data-rac])[data-focus-visible] {
        &::after {
          content: var(--tw-content);
          opacity: 0%;
        }
      }
      &:where(:not([data-rac])):focus-visible {
        &::after {
          content: var(--tw-content);
          opacity: 0%;
        }
      }
    }
  }
  .focus-visible\:\[\&\>td\]\:after\:opacity-0 {
    &:where([data-rac])[data-focus-visible] {
      &>td {
        &::after {
          content: var(--tw-content);
          opacity: 0%;
        }
      }
    }
    &:where(:not([data-rac])):focus-visible {
      &>td {
        &::after {
          content: var(--tw-content);
          opacity: 0%;
        }
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:pointer-events-none {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        pointer-events: none;
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:absolute {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        position: absolute;
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:inset-x-0 {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        inset-inline: calc(var(--spacing) * 0);
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:bottom-0 {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        bottom: calc(var(--spacing) * 0);
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:h-px {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        height: 1px;
      }
    }
  }
  .\[\&\>tr\>th\]\:after\:bg-border-secondary {
    &>tr>th {
      &::after {
        content: var(--tw-content);
        background-color: var(--color-border-secondary);
      }
    }
  }
  .\[\&\>tr\>th\]\:focus-visible\:after\:bg-transparent {
    &>tr>th {
      &:where([data-rac])[data-focus-visible] {
        &::after {
          content: var(--tw-content);
          background-color: transparent;
        }
      }
      &:where(:not([data-rac])):focus-visible {
        &::after {
          content: var(--tw-content);
          background-color: transparent;
        }
      }
    }
  }
}
@layer base {
  .dark-mode {
    --color-alpha-white: rgb(12 14 18);
    --color-alpha-black: rgb(255 255 255);
    --color-gray-25: rgb(250 250 250);
    --color-gray-50: rgb(247 247 247);
    --color-gray-100: rgb(240 240 241);
    --color-gray-200: rgb(236 236 237);
    --color-gray-300: rgb(206 207 210);
    --color-gray-400: rgb(148 151 156);
    --color-gray-500: rgb(133 136 142);
    --color-gray-600: rgb(97 101 108);
    --color-gray-700: rgb(55 58 65);
    --color-gray-800: rgb(34 38 47);
    --color-gray-900: rgb(19 22 27);
    --color-gray-950: rgb(12 14 18);
    --color-utility-blue-50: var(--color-blue-950);
    --color-utility-blue-100: var(--color-blue-900);
    --color-utility-blue-200: var(--color-blue-800);
    --color-utility-blue-300: var(--color-blue-700);
    --color-utility-blue-400: var(--color-blue-600);
    --color-utility-blue-500: var(--color-blue-500);
    --color-utility-blue-600: var(--color-blue-400);
    --color-utility-blue-700: var(--color-blue-300);
    --color-utility-brand-50: var(--color-brand-950);
    --color-utility-brand-50_alt: var(--color-utility-gray-50);
    --color-utility-brand-100: var(--color-brand-900);
    --color-utility-brand-100_alt: var(--color-utility-gray-100);
    --color-utility-brand-200: var(--color-brand-800);
    --color-utility-brand-200_alt: var(--color-utility-gray-200);
    --color-utility-brand-300: var(--color-brand-700);
    --color-utility-brand-300_alt: var(--color-utility-gray-300);
    --color-utility-brand-400: var(--color-brand-600);
    --color-utility-brand-400_alt: var(--color-utility-gray-400);
    --color-utility-brand-500: var(--color-brand-500);
    --color-utility-brand-500_alt: var(--color-utility-gray-500);
    --color-utility-brand-600: var(--color-brand-400);
    --color-utility-brand-600_alt: var(--color-utility-gray-600);
    --color-utility-brand-700: var(--color-brand-300);
    --color-utility-brand-700_alt: var(--color-utility-gray-700);
    --color-utility-brand-800: var(--color-brand-200);
    --color-utility-brand-800_alt: var(--color-utility-gray-800);
    --color-utility-brand-900: var(--color-brand-100);
    --color-utility-brand-900_alt: var(--color-utility-gray-900);
    --color-utility-gray-50: var(--color-gray-900);
    --color-utility-gray-100: var(--color-gray-800);
    --color-utility-gray-200: var(--color-gray-700);
    --color-utility-gray-300: var(--color-gray-700);
    --color-utility-gray-400: var(--color-gray-600);
    --color-utility-gray-500: var(--color-gray-500);
    --color-utility-gray-600: var(--color-gray-400);
    --color-utility-gray-700: var(--color-gray-300);
    --color-utility-gray-800: var(--color-gray-200);
    --color-utility-gray-900: var(--color-gray-100);
    --color-utility-error-50: var(--color-error-950);
    --color-utility-error-100: var(--color-error-900);
    --color-utility-error-200: var(--color-error-800);
    --color-utility-error-300: var(--color-error-700);
    --color-utility-error-400: var(--color-error-600);
    --color-utility-error-500: var(--color-error-500);
    --color-utility-error-600: var(--color-error-400);
    --color-utility-error-700: var(--color-error-300);
    --color-utility-warning-50: var(--color-warning-950);
    --color-utility-warning-100: var(--color-warning-900);
    --color-utility-warning-200: var(--color-warning-800);
    --color-utility-warning-300: var(--color-warning-700);
    --color-utility-warning-400: var(--color-warning-600);
    --color-utility-warning-500: var(--color-warning-500);
    --color-utility-warning-600: var(--color-warning-400);
    --color-utility-warning-700: var(--color-warning-300);
    --color-utility-success-50: var(--color-success-950);
    --color-utility-success-100: var(--color-success-900);
    --color-utility-success-200: var(--color-success-800);
    --color-utility-success-300: var(--color-success-700);
    --color-utility-success-400: var(--color-success-600);
    --color-utility-success-500: var(--color-success-500);
    --color-utility-success-600: var(--color-success-400);
    --color-utility-success-700: var(--color-success-300);
    --color-utility-orange-50: var(--color-orange-950);
    --color-utility-orange-100: var(--color-orange-900);
    --color-utility-orange-200: var(--color-orange-800);
    --color-utility-orange-300: var(--color-orange-700);
    --color-utility-orange-400: var(--color-orange-600);
    --color-utility-orange-500: var(--color-orange-500);
    --color-utility-orange-600: var(--color-orange-400);
    --color-utility-orange-700: var(--color-orange-300);
    --color-utility-blue-dark-50: var(--color-blue-dark-950);
    --color-utility-blue-dark-100: var(--color-blue-dark-900);
    --color-utility-blue-dark-200: var(--color-blue-dark-800);
    --color-utility-blue-dark-300: var(--color-blue-dark-700);
    --color-utility-blue-dark-400: var(--color-blue-dark-600);
    --color-utility-blue-dark-500: var(--color-blue-dark-500);
    --color-utility-blue-dark-600: var(--color-blue-dark-400);
    --color-utility-blue-dark-700: var(--color-blue-dark-300);
    --color-utility-indigo-50: var(--color-indigo-950);
    --color-utility-indigo-100: var(--color-indigo-900);
    --color-utility-indigo-200: var(--color-indigo-800);
    --color-utility-indigo-300: var(--color-indigo-700);
    --color-utility-indigo-400: var(--color-indigo-600);
    --color-utility-indigo-500: var(--color-indigo-500);
    --color-utility-indigo-600: var(--color-indigo-400);
    --color-utility-indigo-700: var(--color-indigo-300);
    --color-utility-fuchsia-50: var(--color-fuchsia-950);
    --color-utility-fuchsia-100: var(--color-fuchsia-900);
    --color-utility-fuchsia-200: var(--color-fuchsia-800);
    --color-utility-fuchsia-300: var(--color-fuchsia-700);
    --color-utility-fuchsia-400: var(--color-fuchsia-600);
    --color-utility-fuchsia-500: var(--color-fuchsia-500);
    --color-utility-fuchsia-600: var(--color-fuchsia-400);
    --color-utility-fuchsia-700: var(--color-fuchsia-300);
    --color-utility-pink-50: var(--color-pink-950);
    --color-utility-pink-100: var(--color-pink-900);
    --color-utility-pink-200: var(--color-pink-800);
    --color-utility-pink-300: var(--color-pink-700);
    --color-utility-pink-400: var(--color-pink-600);
    --color-utility-pink-500: var(--color-pink-500);
    --color-utility-pink-600: var(--color-pink-400);
    --color-utility-pink-700: var(--color-pink-300);
    --color-utility-purple-50: var(--color-purple-950);
    --color-utility-purple-100: var(--color-purple-900);
    --color-utility-purple-200: var(--color-purple-800);
    --color-utility-purple-300: var(--color-purple-700);
    --color-utility-purple-400: var(--color-purple-600);
    --color-utility-purple-500: var(--color-purple-500);
    --color-utility-purple-600: var(--color-purple-400);
    --color-utility-purple-700: var(--color-purple-300);
    --color-utility-orange-dark-50: var(--color-orange-dark-950);
    --color-utility-orange-dark-100: var(--color-orange-dark-900);
    --color-utility-orange-dark-200: var(--color-orange-dark-800);
    --color-utility-orange-dark-300: var(--color-orange-dark-700);
    --color-utility-orange-dark-400: var(--color-orange-dark-600);
    --color-utility-orange-dark-500: var(--color-orange-dark-500);
    --color-utility-orange-dark-600: var(--color-orange-dark-400);
    --color-utility-orange-dark-700: var(--color-orange-dark-300);
    --color-utility-blue-light-50: var(--color-blue-light-950);
    --color-utility-blue-light-100: var(--color-blue-light-900);
    --color-utility-blue-light-200: var(--color-blue-light-800);
    --color-utility-blue-light-300: var(--color-blue-light-700);
    --color-utility-blue-light-400: var(--color-blue-light-600);
    --color-utility-blue-light-500: var(--color-blue-light-500);
    --color-utility-blue-light-600: var(--color-blue-light-400);
    --color-utility-blue-light-700: var(--color-blue-light-300);
    --color-utility-gray-blue-50: var(--color-gray-blue-950);
    --color-utility-gray-blue-100: var(--color-gray-blue-900);
    --color-utility-gray-blue-200: var(--color-gray-blue-800);
    --color-utility-gray-blue-300: var(--color-gray-blue-700);
    --color-utility-gray-blue-400: var(--color-gray-blue-600);
    --color-utility-gray-blue-500: var(--color-gray-blue-500);
    --color-utility-gray-blue-600: var(--color-gray-blue-400);
    --color-utility-gray-blue-700: var(--color-gray-blue-300);
    --color-utility-green-50: var(--color-green-950);
    --color-utility-green-100: var(--color-green-900);
    --color-utility-green-200: var(--color-green-800);
    --color-utility-green-300: var(--color-green-700);
    --color-utility-green-400: var(--color-green-600);
    --color-utility-green-500: var(--color-green-500);
    --color-utility-green-600: var(--color-green-400);
    --color-utility-green-700: var(--color-green-300);
    --color-utility-yellow-50: var(--color-yellow-950);
    --color-utility-yellow-100: var(--color-yellow-900);
    --color-utility-yellow-200: var(--color-yellow-800);
    --color-utility-yellow-300: var(--color-yellow-700);
    --color-utility-yellow-400: var(--color-yellow-600);
    --color-utility-yellow-500: var(--color-yellow-500);
    --color-utility-yellow-600: var(--color-yellow-400);
    --color-utility-yellow-700: var(--color-yellow-300);
    --color-text-white: var(--color-white);
    --color-text-primary: var(--color-gray-50);
    --color-text-secondary: var(--color-gray-300);
    --color-text-secondary_hover: var(--color-gray-200);
    --color-text-tertiary: var(--color-gray-400);
    --color-text-tertiary_hover: var(--color-gray-300);
    --color-text-quaternary: var(--color-gray-400);
    --color-text-error-primary: var(--color-error-400);
    --color-text-warning-primary: var(--color-warning-400);
    --color-text-success-primary: var(--color-success-400);
    --color-text-disabled: var(--color-gray-500);
    --color-text-brand-primary: var(--color-gray-50);
    --color-text-brand-secondary: var(--color-gray-300);
    --color-text-brand-tertiary: var(--color-gray-400);
    --color-text-placeholder: var(--color-gray-500);
    --color-text-placeholder_subtle: var(--color-gray-700);
    --color-text-primary_on-brand: var(--color-gray-50);
    --color-text-secondary_on-brand: var(--color-gray-300);
    --color-text-tertiary_on-brand: var(--color-gray-400);
    --color-text-quaternary_on-brand: var(--color-gray-400);
    --color-text-brand-secondary_hover: var(--color-gray-200);
    --color-text-brand-tertiary_alt: var(--color-gray-50);
    --color-text-error-primary_hover: var(--color-error-300);
    --color-border-primary: var(--color-gray-700);
    --color-border-secondary: var(--color-gray-800);
    --color-border-secondary_alt: var(--color-gray-800);
    --color-border-tertiary: var(--color-gray-800);
    --color-border-brand: var(--color-brand-400);
    --color-border-brand_alt: var(--color-gray-700);
    --color-border-error: var(--color-error-400);
    --color-border-error_subtle: var(--color-error-500);
    --color-border-disabled: var(--color-gray-700);
    --color-border-disabled_subtle: var(--color-gray-800);
    --color-fg-white: var(--color-white);
    --color-fg-primary: var(--color-white);
    --color-fg-secondary: var(--color-gray-300);
    --color-fg-tertiary: var(--color-gray-400);
    --color-fg-tertiary_hover: var(--color-gray-300);
    --color-fg-quaternary: var(--color-gray-600);
    --color-fg-quaternary_hover: var(--color-gray-500);
    --color-fg-error-primary: var(--color-error-500);
    --color-fg-error-secondary: var(--color-error-400);
    --color-fg-warning-primary: var(--color-warning-500);
    --color-fg-warning-secondary: var(--color-warning-400);
    --color-fg-success-primary: var(--color-success-500);
    --color-fg-success-secondary: var(--color-success-400);
    --color-fg-secondary_hover: var(--color-gray-200);
    --color-fg-disabled: var(--color-gray-500);
    --color-fg-disabled_subtle: var(--color-gray-600);
    --color-fg-brand-primary: var(--color-brand-500);
    --color-fg-brand-secondary: var(--color-brand-500);
    --color-fg-brand-primary_alt: var(--color-gray-300);
    --color-fg-brand-secondary_alt: var(--color-gray-600);
    --color-fg-brand-secondary_hover: var(--color-gray-500);
    --color-bg-primary: var(--color-gray-950);
    --color-bg-primary-solid: var(--color-bg-secondary);
    --color-bg-primary_alt: var(--color-bg-secondary);
    --color-bg-primary_hover: var(--color-gray-800);
    --color-bg-secondary: var(--color-gray-900);
    --color-bg-secondary-solid: var(--color-gray-600);
    --color-bg-secondary_subtle: var(--color-gray-900);
    --color-bg-secondary_hover: var(--color-gray-800);
    --color-bg-tertiary: var(--color-gray-800);
    --color-bg-quaternary: var(--color-gray-700);
    --color-bg-error-primary: var(--color-error-950);
    --color-bg-error-secondary: var(--color-error-600);
    --color-bg-error-solid: var(--color-error-600);
    --color-bg-error-solid_hover: var(--color-error-500);
    --color-bg-warning-primary: var(--color-warning-950);
    --color-bg-warning-secondary: var(--color-warning-600);
    --color-bg-warning-solid: var(--color-warning-600);
    --color-bg-success-primary: var(--color-success-950);
    --color-bg-success-secondary: var(--color-success-600);
    --color-bg-success-solid: var(--color-success-600);
    --color-bg-active: var(--color-gray-800);
    --color-bg-disabled: var(--color-gray-800);
    --color-bg-disabled_subtle: var(--color-gray-900);
    --color-bg-brand-primary: var(--color-brand-500);
    --color-bg-brand-primary_alt: var(--color-bg-secondary);
    --color-bg-brand-secondary: var(--color-brand-600);
    --color-bg-secondary_alt: var(--color-bg-primary);
    --color-bg-brand-solid: var(--color-brand-600);
    --color-bg-brand-solid_hover: var(--color-brand-500);
    --color-bg-overlay: var(--color-gray-800);
    --color-bg-brand-section: var(--color-bg-secondary);
    --color-bg-brand-section_subtle: var(--color-bg-primary);
    --color-app-store-badge-border: var(--color-white);
    --color-avatar-bg: var(--color-gray-800);
    --color-avatar-contrast-border: rgb(255 255 255 / 0.12);
    --color-avatar-profile-photo-border: var(--color-gray-950);
    --color-avatar-styles-bg-neutral: rgb(224 224 224 / 1);
    --color-button-destructive-primary-icon: var(--color-error-300);
    --color-button-destructive-primary-icon_hover: var(--color-error-200);
    --color-button-primary-icon: var(--color-brand-300);
    --color-button-primary-icon_hover: var(--color-brand-200);
    --color-featured-icon-light-fg-brand: var(--color-brand-200);
    --color-featured-icon-light-fg-error: var(--color-error-200);
    --color-featured-icon-light-fg-gray: var(--color-gray-200);
    --color-featured-icon-light-fg-success: var(--color-success-200);
    --color-featured-icon-light-fg-warning: var(--color-warning-200);
    --color-focus-ring-error: var(--color-error-500);
    --color-focus-ring: var(--color-brand-500);
    --color-footer-button-fg: var(--color-gray-300);
    --color-footer-button-fg_hover: var(--color-gray-100);
    --color-icon-fg-brand: var(--color-gray-400);
    --color-icon-fg-brand_on-brand: var(--color-gray-400);
    --color-nav-item-button-icon-fg: var(--color-gray-400);
    --color-nav-item-button-icon-fg_active: var(--color-gray-300);
    --color-nav-item-icon-fg: var(--color-gray-400);
    --color-nav-item-icon-fg_active: var(--color-gray-300);
    --color-screen-mockup-border: var(--color-gray-700);
    --color-slider-handle-bg: var(--color-fg-brand-primary);
    --color-slider-handle-border: var(--color-bg-primary);
    --color-toggle-border: var(--color-transparent);
    --color-toggle-button-fg_disabled: var(--color-gray-600);
    --color-toggle-slim-border_pressed-hover: var(--color-transparent);
    --color-toggle-slim-border_pressed: var(--color-transparent);
    --color-tooltip-supporting-text: var(--color-gray-300);
    --color-text-editor-icon-fg: var(--color-gray-400);
    --color-text-editor-icon-fg_active: var(--color-white);
    --background-color-primary: var(--color-bg-primary);
    --background-color-primary-solid: var(--color-bg-primary-solid);
    --background-color-primary_alt: var(--color-bg-primary_alt);
    --background-color-primary_hover: var(--color-bg-primary_hover);
    --background-color-secondary: var(--color-bg-secondary);
    --background-color-secondary-solid: var(--color-bg-secondary-solid);
    --background-color-secondary_alt: var(--color-bg-secondary_alt);
    --background-color-secondary_hover: var(--color-bg-secondary_hover);
    --background-color-secondary_subtle: var(--color-bg-secondary_subtle);
    --background-color-tertiary: var(--color-bg-tertiary);
    --background-color-quaternary: var(--color-bg-quaternary);
    --background-color-active: var(--color-bg-active);
    --background-color-disabled: var(--color-bg-disabled);
    --background-color-disabled_subtle: var(--color-bg-disabled_subtle);
    --background-color-overlay: var(--color-bg-overlay);
    --background-color-brand-primary: var(--color-bg-brand-primary);
    --background-color-brand-primary_alt: var(--color-bg-brand-primary_alt);
    --background-color-brand-secondary: var(--color-bg-brand-secondary);
    --background-color-brand-solid: var(--color-bg-brand-solid);
    --background-color-brand-solid_hover: var(--color-bg-brand-solid_hover);
    --background-color-brand-section: var(--color-bg-brand-section);
    --background-color-brand-section_subtle: var(--color-bg-brand-section_subtle);
    --background-color-error-primary: var(--color-bg-error-primary);
    --background-color-error-secondary: var(--color-bg-error-secondary);
    --background-color-error-solid: var(--color-bg-error-solid);
    --background-color-error-solid_hover: var(--color-bg-error-solid_hover);
    --background-color-warning-primary: var(--color-bg-warning-primary);
    --background-color-warning-secondary: var(--color-bg-warning-secondary);
    --background-color-warning-solid: var(--color-bg-warning-solid);
    --background-color-success-primary: var(--color-bg-success-primary);
    --background-color-success-secondary: var(--color-bg-success-secondary);
    --background-color-success-solid: var(--color-bg-success-solid);
    --background-color-border-brand: var(--color-border-brand);
    --background-color-border-tertiary: var(--color-border-tertiary);
    --background-color-border-brand_alt: var(--color-border-brand_alt);
    --text-color-primary: var(--color-text-primary);
    --text-color-primary_on-brand: var(--color-text-primary_on-brand);
    --text-color-secondary: var(--color-text-secondary);
    --text-color-secondary_hover: var(--color-text-secondary_hover);
    --text-color-secondary_on-brand: var(--color-text-secondary_on-brand);
    --text-color-tertiary: var(--color-text-tertiary);
    --text-color-tertiary_hover: var(--color-text-tertiary_hover);
    --text-color-tertiary_on-brand: var(--color-text-tertiary_on-brand);
    --text-color-quaternary: var(--color-text-quaternary);
    --text-color-quaternary_on-brand: var(--color-text-quaternary_on-brand);
    --text-color-disabled: var(--color-text-disabled);
    --text-color-placeholder: var(--color-text-placeholder);
    --text-color-placeholder_subtle: var(--color-text-placeholder_subtle);
    --text-color-brand-primary: var(--color-text-brand-primary);
    --text-color-brand-secondary: var(--color-text-brand-secondary);
    --text-color-brand-secondary_hover: var(--color-text-brand-secondary_hover);
    --text-color-brand-tertiary: var(--color-text-brand-tertiary);
    --text-color-brand-tertiary_alt: var(--color-text-brand-tertiary_alt);
    --text-color-error-primary: var(--color-text-error-primary);
    --text-color-error-primary_hover: var(--color-text-error-primary_hover);
    --text-color-warning-primary: var(--color-text-warning-primary);
    --text-color-success-primary: var(--color-text-success-primary);
    --text-color-tooltip-supporting-text: var(--color-tooltip-supporting-text);
    --border-color-primary: var(--color-border-primary);
    --border-color-secondary: var(--color-border-secondary);
    --border-color-secondary_alt: var(--color-border-secondary_alt);
    --border-color-tertiary: var(--color-border-tertiary);
    --border-color-disabled: var(--color-border-disabled);
    --border-color-brand: var(--color-border-brand);
    --border-color-brand-solid: var(--color-bg-brand-solid);
    --border-color-brand-solid_hover: var(--color-bg-brand-solid_hover);
    --border-color-error: var(--color-border-error);
    --border-color-disabled_subtle: var(--color-border-disabled_subtle);
    --border-color-brand_alt: var(--color-border-brand_alt);
    --border-color-error_subtle: var(--color-border-error_subtle);
    --ring-color-primary: var(--color-border-primary);
    --ring-color-secondary: var(--color-border-secondary);
    --ring-color-secondary_alt: var(--color-border-secondary_alt);
    --ring-color-tertiary: var(--color-border-tertiary);
    --ring-color-brand: var(--color-border-brand);
    --ring-color-brand-solid: var(--color-bg-brand-solid);
    --ring-color-brand-solid_hover: var(--color-bg-brand-solid_hover);
    --ring-color-error: var(--color-border-error);
    --ring-color-error_subtle: var(--color-border-error_subtle);
    --ring-color-disabled: var(--color-border-disabled);
    --ring-color-disabled_subtle: var(--color-border-disabled_subtle);
    --ring-color-brand_alt: var(--color-border-brand_alt);
    --ring-color-bg-brand-solid: var(--color-bg-brand-solid);
    --outline-color-primary: var(--color-border-primary);
    --outline-color-secondary: var(--color-border-secondary);
    --outline-color-secondary_alt: var(--color-border-secondary_alt);
    --outline-color-tertiary: var(--color-border-tertiary);
    --outline-color-disabled: var(--color-border-disabled);
    --outline-color-disabled_subtle: var(--color-border-disabled_subtle);
    --outline-color-brand-solid: var(--color-bg-brand-solid);
    --outline-color-brand-solid_hover: var(--color-bg-brand-solid_hover);
    --outline-color-error: var(--color-border-error);
    --outline-color-error_subtle: var(--color-border-error_subtle);
    --outline-color-brand: var(--color-border-brand);
    --outline-color-brand_alt: var(--color-border-brand_alt);
  }
}
.prose:not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  --tw-prose-body: var(--color-text-tertiary);
  --tw-prose-headings: var(--color-text-primary);
  --tw-prose-lead: var(--color-text-tertiary);
  --tw-prose-links: var(--color-text-tertiary);
  --tw-prose-bold: var(--color-text-primary);
  --tw-prose-counters: var(--color-text-tertiary);
  --tw-prose-bullets: var(--color-text-tertiary);
  --tw-prose-hr: var(--color-border-secondary);
  --tw-prose-quotes: var(--color-text-primary);
  --tw-prose-quote-borders: var(--color-fg-brand-primary_alt);
  --tw-prose-captions: var(--color-text-tertiary);
  --tw-prose-code: var(--color-text-tertiary);
  --tw-prose-pre-code: var(--color-text-tertiary);
  --tw-prose-pre-bg: var(--color-bg-primary);
  --tw-prose-th-borders: var(--color-border-primary);
  --tw-prose-td-borders: var(--color-border-secondary);
  color: var(--tw-prose-body);
  font-size: var(--text-md);
  line-height: var(--text-md--line-height);
}
.prose :not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  &:where(p) {
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 4);
  }
  &:where([class~="lead"]) {
    font-size: var(--text-md);
    line-height: var(--text-md--line-height);
    margin-top: 1.2em;
    margin-bottom: 1.2em;
  }
  &:where(ol) {
    list-style-type: decimal;
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 4);
    padding-inline-start: calc(var(--spacing) * 5.75);
  }
  &:where(ul) {
    list-style-type: disc;
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 4);
    padding-inline-start: calc(var(--spacing) * 5.75);
  }
  &:where(li) {
    margin-top: calc(var(--spacing) * 2);
    margin-bottom: calc(var(--spacing) * 2);
  }
  &:where(ol > li) {
    padding-inline-start: 1px;
    margin-top: 0;
    margin-bottom: 0;
  }
  &:where(ul > li) {
    padding-inline-start: 1px;
    margin-top: 0;
    margin-bottom: 0;
  }
  &:where(hr) {
    margin-top: calc(var(--spacing) * 8);
    margin-bottom: calc(var(--spacing) * 8);
  }
  &:where(blockquote) {
    color: var(--tw-prose-quotes);
    border-left-width: 2px;
    border-left-color: var(--tw-prose-quote-borders);
    padding-inline-start: 0;
    margin-top: calc(var(--spacing) * 10);
    margin-bottom: calc(var(--spacing) * 10);
  }
  &:where(blockquote p) {
    margin: 0;
    font-weight: 500;
    font-style: italic;
    font-size: var(--text-xl);
    line-height: var(--text-xl--line-height);
  }
  &:where(blockquote p:first-of-type::before) {
    content: open-quote;
  }
  &:where(blockquote p:last-of-type::after) {
    content: close-quote;
  }
  &:where(h1) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    font-size: var(--text-display-sm);
    line-height: var(--text-display-sm--line-height);
    margin-bottom: calc(var(--spacing) * 5);
    margin-top: calc(var(--spacing) * 10);
  }
  &:where(h2) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    font-size: var(--text-display-xs);
    line-height: var(--text-display-xs--line-height);
    margin-bottom: calc(var(--spacing) * 4);
    margin-top: calc(var(--spacing) * 8);
  }
  &:where(h3) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    font-size: var(--text-xl);
    line-height: var(--text-xl--line-height);
    margin-bottom: calc(var(--spacing) * 3);
    margin-top: calc(var(--spacing) * 8);
  }
  &:where(h4) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    font-size: var(--text-lg);
    line-height: var(--text-lg--line-height);
    margin-bottom: calc(var(--spacing) * 2);
    margin-top: calc(var(--spacing) * 5);
  }
  &:where(h2 + *) {
    margin-top: 0;
  }
  &:where(h3 + *) {
    margin-top: 0;
  }
  &:where(h4 + *) {
    margin-top: 0;
  }
  &:where(h1 strong) {
    font-weight: 900;
    color: inherit;
  }
  &:where(h2 strong) {
    font-weight: 800;
    color: inherit;
  }
  &:where(h3 strong) {
    font-weight: 700;
    color: inherit;
  }
  &:where(h4 strong) {
    font-weight: 700;
    color: inherit;
  }
  &:where(img) {
    border-radius: var(--radius-xl);
    width: 100%;
    object-fit: cover;
    margin-top: calc(var(--spacing) * 8);
    margin-bottom: calc(var(--spacing) * 8);
  }
  &:where(video) {
    margin-top: calc(var(--spacing) * 8);
    margin-bottom: calc(var(--spacing) * 8);
  }
  &:where(figure) {
    margin-top: calc(var(--spacing) * 10);
    margin-bottom: calc(var(--spacing) * 10);
  }
  &:where(figure > *) {
    margin-top: 0;
    margin-bottom: 0;
  }
  &:where(figure:has(> blockquote)) {
    border-left-width: 2px;
    border-left-color: var(--tw-prose-quote-borders);
    padding-top: calc(var(--spacing) * 2);
    padding-bottom: calc(var(--spacing) * 2);
    padding-inline-start: calc(var(--spacing) * 4);
  }
  &:where(figure:has(> blockquote) blockquote) {
    padding-inline-start: 0;
    border: none;
  }
  &:where(img + figcaption) {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 1.5);
  }
  &:where(figcaption) {
    color: var(--tw-prose-captions);
    font-size: var(--text-sm);
    line-height: var(--text-sm--line-height);
    margin-top: calc(var(--spacing) * 3);
  }
  &:where(cite) {
    font-style: normal;
  }
  &:where(a:not(h1 a, h2 a, h3 a, h4 a, h5 a, h6 a)) {
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  &:where(a:focus-visible) {
    border-radius: var(--radius-sm);
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
  }
  &:where(:is(h1, h2, h3) a) {
    color: var(--tw-prose-headings);
    font-weight: inherit;
    text-decoration: none;
  }
  &:where(code:not(pre code)) {
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 700;
    border-radius: 6px;
    padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 1.5);
    margin: calc(var(--spacing) * -0.5) 0px;
    background: var(--color-bg-secondary);
    box-shadow: 0 0 0 1px var(--color-border-secondary);
    &::before, &::after {
      content: "";
    }
  }
}
.prose.prose-centered-quote :not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  &:where(blockquote) {
    padding-inline-start: 0px !important;
    border-left: none;
    text-align: center;
  }
  &:where(figure:has(> blockquote)) {
    border-left: none;
    padding-inline-start: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    text-align: center;
  }
}
.prose.prose-minimal-quote :not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  &:where(blockquote) {
    border-left: none;
    padding-inline-start: 0px !important;
  }
  &:where(figure:has(> blockquote)) {
    border-left: none;
    padding-inline-start: 0px !important;
  }
}
.prose.md\:prose-lg:not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  @media (width >= 48rem ) {
    font-size: var(--text-lg);
    line-height: var(--text-lg--line-height);
  }
}
.prose.md\:prose-lg :not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  @media (width >= 48rem ) {
    &:where(p) {
      margin-top: calc(var(--spacing) * 4.5);
      margin-bottom: calc(var(--spacing) * 4.5);
    }
    &:where([class~="lead"]) {
      font-size: var(--text-xl);
      line-height: var(--text-xl--line-height);
      margin-top: 1.09em;
      margin-bottom: 1.09em;
    }
    &:where(ol) {
      margin-top: calc(var(--spacing) * 4.5);
      margin-bottom: calc(var(--spacing) * 4.5);
      padding-inline-start: calc(var(--spacing) * 6.5);
    }
    &:where(ul) {
      margin-top: calc(var(--spacing) * 4.5);
      margin-bottom: calc(var(--spacing) * 4.5);
      padding-inline-start: calc(var(--spacing) * 6.5);
    }
    &:where(ol > li) {
      padding-inline-start: 1px;
      margin-top: 0;
      margin-bottom: 0;
    }
    &:where(ul > li) {
      padding-inline-start: 1px;
      margin-top: 0;
      margin-bottom: 0;
    }
    &:where(hr) {
      margin-top: calc(var(--spacing) * 8);
      margin-bottom: calc(var(--spacing) * 8);
    }
    &:where(blockquote) {
      padding-inline-start: 0;
      margin-top: calc(var(--spacing) * 12);
      margin-bottom: calc(var(--spacing) * 12);
    }
    &:where(blockquote p) {
      margin: 0;
      font-size: var(--text-display-xs);
      line-height: var(--text-display-xs--line-height);
    }
    &:where(h1) {
      font-size: var(--text-display-md);
      line-height: var(--text-display-md--line-height);
      margin-bottom: calc(var(--spacing) * 6);
      margin-top: calc(var(--spacing) * 12);
    }
    &:where(h2) {
      font-size: var(--text-display-sm);
      line-height: var(--text-display-sm--line-height);
      margin-bottom: calc(var(--spacing) * 5);
      margin-top: calc(var(--spacing) * 10);
    }
    &:where(h3) {
      font-size: var(--text-display-xs);
      line-height: var(--text-display-xs--line-height);
      margin-bottom: calc(var(--spacing) * 4);
      margin-top: calc(var(--spacing) * 8);
    }
    &:where(h4) {
      font-size: var(--text-xl);
      line-height: var(--text-xl--line-height);
      margin-bottom: calc(var(--spacing) * 3);
      margin-top: calc(var(--spacing) * 8);
    }
    &:where(h2 + *) {
      margin-top: 0;
    }
    &:where(h3 + *) {
      margin-top: 0;
    }
    &:where(h4 + *) {
      margin-top: 0;
    }
    &:where(figure) {
      margin-top: calc(var(--spacing) * 12);
      margin-bottom: calc(var(--spacing) * 12);
    }
    &:where(figure > *) {
      margin-top: 0;
      margin-bottom: 0;
    }
    &:where(figure:has(> blockquote)) {
      padding-inline-start: calc(var(--spacing) * 5);
    }
    &:where(figure > blockquote + figcaption) {
      font-size: var(--text-md);
      line-height: var(--text-md--line-height);
    }
    &:where(figcaption) {
      margin-top: calc(var(--spacing) * 4);
    }
    &:where(a:not(h1 a, h2 a, h3 a, h4 a, h5 a, h6 a)) {
      font-weight: 400;
      text-decoration: underline;
      text-underline-offset: 3px;
    }
    &:where(:is(h1, h2, h3) a) {
      color: var(--tw-prose-headings);
      font-weight: inherit;
      text-decoration: none;
    }
    &:where(code:not(pre code)) {
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 700;
      border-radius: 6px;
      padding: calc(var(--spacing) * 0.5) calc(var(--spacing) * 1.5);
      margin: calc(var(--spacing) * -0.5) 0px;
      background: var(--color-bg-secondary);
      box-shadow: 0 0 0 1px var(--color-border-secondary);
    }
  }
}
.prose > :first-child:not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin-top: 0;
}
.prose > :last-child:not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  margin-bottom: 0;
}
html, body {
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-variant-ligatures: contextual;
  font-variant-ligatures: contextual;
  -webkit-font-kerning: normal;
  font-kerning: normal;
}
details summary::-webkit-details-marker {
  display: none;
}
input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
.dark-mode .tz-rich-text-editor .jodit-container:not(.jodit_inline) {
  background: var(--color-bg-primary);
  border-color: var(--color-border-secondary);
}
.dark-mode .tz-rich-text-editor .jodit-workplace {
  background: var(--color-bg-primary);
}
.dark-mode .tz-rich-text-editor .jodit-wysiwyg, .dark-mode .tz-rich-text-editor .jodit-wysiwyg_iframe {
  background: var(--color-bg-primary);
  color: var(--color-text-primary);
}
.dark-mode .tz-rich-text-editor .jodit-wysiwyg ::selection {
  background: color-mix(in srgb, rgb(21 112 239) 35%, transparent);
  @supports (color: color-mix(in lab, red, red)) {
    background: color-mix(in oklab, var(--color-bg-brand-solid) 35%, transparent);
  }
}
.dark-mode .tz-rich-text-editor .jodit-toolbar__box, .dark-mode .tz-rich-text-editor .jodit-toolbar__items, .dark-mode .tz-rich-text-editor .jodit-toolbar-editor-collection, .dark-mode .tz-rich-text-editor .jodit-toolbar-editor-collection__group, .dark-mode .tz-rich-text-editor .jodit-status-bar {
  background: var(--color-bg-secondary) !important;
  border-color: var(--color-border-secondary) !important;
  color: var(--color-text-tertiary);
}
.dark-mode .tz-rich-text-editor .jodit-toolbar-button__button, .dark-mode .tz-rich-text-editor .jodit-toolbar-button {
  color: var(--color-text-secondary);
}
.dark-mode .tz-rich-text-editor .jodit-toolbar-button svg, .dark-mode .tz-rich-text-editor .jodit-toolbar-button svg * {
  fill: currentColor !important;
}
.jodit_fullsize, .jodit-container.jodit_fullsize {
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 100000 !important;
  margin: 0 !important;
  border-radius: 0 !important;
  max-width: none !important;
  max-height: none !important;
}
.dark-mode .jodit_fullsize, .dark-mode .jodit-container.jodit_fullsize {
  background: var(--color-bg-primary) !important;
}
.dark-mode .jodit_fullsize .jodit-workplace, .dark-mode .jodit_fullsize .jodit-wysiwyg, .dark-mode .jodit-container.jodit_fullsize .jodit-workplace, .dark-mode .jodit-container.jodit_fullsize .jodit-wysiwyg {
  background: var(--color-bg-primary) !important;
  color: var(--color-text-primary) !important;
}
.dark-mode .jodit_fullsize .jodit-toolbar__box, .dark-mode .jodit-container.jodit_fullsize .jodit-toolbar__box {
  background: var(--color-bg-secondary) !important;
  border-color: var(--color-border-secondary) !important;
}
@keyframes enter {
  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit {
  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
@property --tw-translate-x {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-y {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-translate-z {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-scale-x {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-y {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-scale-z {
  syntax: "*";
  inherits: false;
  initial-value: 1;
}
@property --tw-rotate-x {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-y {
  syntax: "*";
  inherits: false;
}
@property --tw-rotate-z {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-x {
  syntax: "*";
  inherits: false;
}
@property --tw-skew-y {
  syntax: "*";
  inherits: false;
}
@property --tw-space-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-space-x-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-divide-y-reverse {
  syntax: "*";
  inherits: false;
  initial-value: 0;
}
@property --tw-border-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-gradient-position {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-via {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-to {
  syntax: "<color>";
  inherits: false;
  initial-value: #0000;
}
@property --tw-gradient-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-via-stops {
  syntax: "*";
  inherits: false;
}
@property --tw-gradient-from-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 0%;
}
@property --tw-gradient-via-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 50%;
}
@property --tw-gradient-to-position {
  syntax: "<length-percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-leading {
  syntax: "*";
  inherits: false;
}
@property --tw-font-weight {
  syntax: "*";
  inherits: false;
}
@property --tw-tracking {
  syntax: "*";
  inherits: false;
}
@property --tw-ordinal {
  syntax: "*";
  inherits: false;
}
@property --tw-slashed-zero {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-figure {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-spacing {
  syntax: "*";
  inherits: false;
}
@property --tw-numeric-fraction {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-inset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-inset-ring-color {
  syntax: "*";
  inherits: false;
}
@property --tw-inset-ring-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-ring-inset {
  syntax: "*";
  inherits: false;
}
@property --tw-ring-offset-width {
  syntax: "<length>";
  inherits: false;
  initial-value: 0px;
}
@property --tw-ring-offset-color {
  syntax: "*";
  inherits: false;
  initial-value: #fff;
}
@property --tw-ring-offset-shadow {
  syntax: "*";
  inherits: false;
  initial-value: 0 0 #0000;
}
@property --tw-outline-style {
  syntax: "*";
  inherits: false;
  initial-value: solid;
}
@property --tw-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-color {
  syntax: "*";
  inherits: false;
}
@property --tw-drop-shadow-alpha {
  syntax: "<percentage>";
  inherits: false;
  initial-value: 100%;
}
@property --tw-drop-shadow-size {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-blur {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-brightness {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-contrast {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-grayscale {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-hue-rotate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-invert {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-opacity {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-saturate {
  syntax: "*";
  inherits: false;
}
@property --tw-backdrop-sepia {
  syntax: "*";
  inherits: false;
}
@property --tw-duration {
  syntax: "*";
  inherits: false;
}
@property --tw-ease {
  syntax: "*";
  inherits: false;
}
@property --tw-content {
  syntax: "*";
  initial-value: "";
  inherits: false;
}
@property --tw-mask-linear {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-radial {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-conic {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-left {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-right {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-bottom {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-top {
  syntax: "*";
  inherits: false;
  initial-value: linear-gradient(#fff, #fff);
}
@property --tw-mask-bottom-from-position {
  syntax: "*";
  inherits: false;
  initial-value: 0%;
}
@property --tw-mask-bottom-to-position {
  syntax: "*";
  inherits: false;
  initial-value: 100%;
}
@property --tw-mask-bottom-from-color {
  syntax: "*";
  inherits: false;
  initial-value: black;
}
@property --tw-mask-bottom-to-color {
  syntax: "*";
  inherits: false;
  initial-value: transparent;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse {
  50% {
    opacity: 0.5;
  }
}
@keyframes caret-blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}
@layer properties {
  @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))) {
    *, ::before, ::after, ::backdrop {
      --tw-translate-x: 0;
      --tw-translate-y: 0;
      --tw-translate-z: 0;
      --tw-scale-x: 1;
      --tw-scale-y: 1;
      --tw-scale-z: 1;
      --tw-rotate-x: initial;
      --tw-rotate-y: initial;
      --tw-rotate-z: initial;
      --tw-skew-x: initial;
      --tw-skew-y: initial;
      --tw-space-y-reverse: 0;
      --tw-space-x-reverse: 0;
      --tw-divide-y-reverse: 0;
      --tw-border-style: solid;
      --tw-gradient-position: initial;
      --tw-gradient-from: #0000;
      --tw-gradient-via: #0000;
      --tw-gradient-to: #0000;
      --tw-gradient-stops: initial;
      --tw-gradient-via-stops: initial;
      --tw-gradient-from-position: 0%;
      --tw-gradient-via-position: 50%;
      --tw-gradient-to-position: 100%;
      --tw-leading: initial;
      --tw-font-weight: initial;
      --tw-tracking: initial;
      --tw-ordinal: initial;
      --tw-slashed-zero: initial;
      --tw-numeric-figure: initial;
      --tw-numeric-spacing: initial;
      --tw-numeric-fraction: initial;
      --tw-shadow: 0 0 #0000;
      --tw-shadow-color: initial;
      --tw-shadow-alpha: 100%;
      --tw-inset-shadow: 0 0 #0000;
      --tw-inset-shadow-color: initial;
      --tw-inset-shadow-alpha: 100%;
      --tw-ring-color: initial;
      --tw-ring-shadow: 0 0 #0000;
      --tw-inset-ring-color: initial;
      --tw-inset-ring-shadow: 0 0 #0000;
      --tw-ring-inset: initial;
      --tw-ring-offset-width: 0px;
      --tw-ring-offset-color: #fff;
      --tw-ring-offset-shadow: 0 0 #0000;
      --tw-outline-style: solid;
      --tw-blur: initial;
      --tw-brightness: initial;
      --tw-contrast: initial;
      --tw-grayscale: initial;
      --tw-hue-rotate: initial;
      --tw-invert: initial;
      --tw-opacity: initial;
      --tw-saturate: initial;
      --tw-sepia: initial;
      --tw-drop-shadow: initial;
      --tw-drop-shadow-color: initial;
      --tw-drop-shadow-alpha: 100%;
      --tw-drop-shadow-size: initial;
      --tw-backdrop-blur: initial;
      --tw-backdrop-brightness: initial;
      --tw-backdrop-contrast: initial;
      --tw-backdrop-grayscale: initial;
      --tw-backdrop-hue-rotate: initial;
      --tw-backdrop-invert: initial;
      --tw-backdrop-opacity: initial;
      --tw-backdrop-saturate: initial;
      --tw-backdrop-sepia: initial;
      --tw-duration: initial;
      --tw-ease: initial;
      --tw-content: "";
      --tw-mask-linear: linear-gradient(#fff, #fff);
      --tw-mask-radial: linear-gradient(#fff, #fff);
      --tw-mask-conic: linear-gradient(#fff, #fff);
      --tw-mask-left: linear-gradient(#fff, #fff);
      --tw-mask-right: linear-gradient(#fff, #fff);
      --tw-mask-bottom: linear-gradient(#fff, #fff);
      --tw-mask-top: linear-gradient(#fff, #fff);
      --tw-mask-bottom-from-position: 0%;
      --tw-mask-bottom-to-position: 100%;
      --tw-mask-bottom-from-color: black;
      --tw-mask-bottom-to-color: transparent;
    }
  }
}
</style><style type="text/css" data-vite-dev-id="/Users/akshanshupal/Projects/Frontend/travel-next-react/tripzipper-vite/node_modules/jodit/es2021/jodit.min.css">.jodit-ui-group{display:inline-flex;flex:0 0 auto;flex-shrink:0;flex-wrap:wrap;max-width:100%}.jodit-ui-group_line_true{display:flex;justify-content:stretch}.jodit-ui-group_separated_true:not(:last-child):not(.jodit-ui-group_before-spacer_true):after{border-left:0;border-right:1px solid var(--jd-color-border);content:"";cursor:default;margin:2px;padding:0}.jodit-ui-group:last-child{border-bottom:0}.jodit-ui-list{display:flex;flex-direction:column}.jodit-ui-list_mode_vertical .jodit-ui-group{background-color:transparent;border:0;flex-direction:column}.jodit-ui-list_mode_vertical .jodit-toolbar-button{height:auto;min-height:var(--jd-button-size)}.jodit-ui-list_mode_vertical .jodit-toolbar-button__button{cursor:pointer;height:auto;min-height:var(--jd-button-size);width:100%}.jodit-ui-list_mode_vertical .jodit-toolbar-button__text:not(:empty){justify-content:left}.jodit-ui-separator{border-left:0;border-right:1px solid var(--jd-color-border);cursor:default;margin:2px;padding:0}.jodit-ui-break{border-top:1px solid var(--jd-color-border);flex-basis:100%;height:0!important;width:0}.jodit-ui-spacer{flex:1}.jodit-ui-button-icon-text__icon{display:none}.jodit-ui-button-icon-text__icon:not(:empty){display:inline-flex}.jodit-ui-button-icon-text__text{display:none}.jodit-ui-button-icon-text__text:not(:empty){display:inline-flex;flex-grow:1;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);justify-content:center;overflow:hidden;text-overflow:ellipsis}.jodit-ui-button-icon-text_context_menu .jodit-ui-button-icon-text__text{justify-content:left;padding-left:var(--jd-padding-default);position:relative}.jodit-ui-button-icon-text_context_menu .jodit-ui-button-icon-text__text:before{border-left:1px solid var(--jd-color-border);content:"";height:35px;left:0;position:absolute;top:calc(var(--jd-padding-default)*-1)}.jodit-ui-button-icon-text__icon:not(:empty)+.jodit-ui-button-icon-text__text:not(:empty){margin-left:var(--jd-padding-default)}.jodit-ui-button-icon-text__icon:empty+.jodit-ui-button-icon-text__text:not(:empty){padding:0 var(--jd-padding-default)}.jodit-ui-button-clear,.jodit-ui-button_clear{appearance:none;background:0 0;border:0;box-shadow:none;box-sizing:border-box;font-style:normal;outline:0;padding:0;position:relative;text-align:center;text-decoration:none;text-transform:none;user-select:none}.jodit-ui-button-sizes{height:34px;min-width:34px}.jodit-ui-button-sizes .jodit-icon{height:14px;width:14px}.jodit-ui-button-sizes button{appearance:none;height:34px;min-width:34px;padding:0}.jodit-ui-button-sizes_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button-sizes_size_tiny{height:16px;min-width:16px}.jodit-ui-button-sizes_size_tiny .jodit-icon{height:8px;width:8px}.jodit-ui-button-sizes_size_tiny button{appearance:none;height:16px;min-width:16px;padding:0}.jodit-ui-button-sizes_size_tiny_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button-sizes_size_xsmall{height:22px;min-width:22px}.jodit-ui-button-sizes_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-ui-button-sizes_size_xsmall button{appearance:none;height:22px;min-width:22px;padding:0}.jodit-ui-button-sizes_size_xsmall_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button-sizes_size_small{height:28px;min-width:28px}.jodit-ui-button-sizes_size_small .jodit-icon{height:12px;width:12px}.jodit-ui-button-sizes_size_small button{appearance:none;height:28px;min-width:28px;padding:0}.jodit-ui-button-sizes_size_small_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button-sizes_size_large{height:40px;min-width:40px}.jodit-ui-button-sizes_size_large .jodit-icon{height:16px;width:16px}.jodit-ui-button-sizes_size_large button{appearance:none;height:40px;min-width:40px;padding:0}.jodit-ui-button-sizes_size_large_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button-variants_variant_outline{border:1px solid var(--jd-color-border)}.jodit-ui-button-variants_variant_default{background-color:#e3e3e3;color:#212529}.jodit-ui-button-variants_variant_default svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default [disabled]{opacity:.7}.jodit-ui-button-variants_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button-variants_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button-variants_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button-variants_variant_primary{background-color:#007bff;color:#fff}.jodit-ui-button-variants_variant_primary svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary [disabled]{opacity:.7}.jodit-ui-button-variants_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-ui-button-variants_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-ui-button-variants_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-ui-button-variants_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-ui-button-variants_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary [disabled]{opacity:.7}.jodit-ui-button-variants_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button-variants_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button-variants_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button-variants_variant_success{background-color:#28a745;color:#fff}.jodit-ui-button-variants_variant_success svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success [disabled]{opacity:.7}.jodit-ui-button-variants_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-ui-button-variants_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-ui-button-variants_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-ui-button-variants_variant_danger{background-color:#dc3545;color:#fff}.jodit-ui-button-variants_variant_danger svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger [disabled]{opacity:.7}.jodit-ui-button-variants_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-ui-button-variants_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-ui-button-variants_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-ui-button-style{border-radius:var(--jd-border-radius-default);padding:0 var(--jd-padding-default)}.jodit-ui-button,.jodit-ui-button-style{align-items:center;color:var(--jd-color-text-icons);display:inline-flex;justify-content:center}.jodit-ui-button{appearance:none;background:0 0;border:0;border-radius:var(--jd-border-radius-default);box-shadow:none;box-sizing:border-box;cursor:pointer;font-style:normal;height:34px;min-width:34px;outline:0;padding:0;padding:0 var(--jd-padding-default);position:relative;text-align:center;text-decoration:none;text-transform:none;user-select:none}.jodit-ui-button:focus-visible:not([disabled]),.jodit-ui-button:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-ui-button:active:not([disabled]),.jodit-ui-button[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-ui-button[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-ui-button[disabled]{opacity:.3;pointer-events:none}.jodit-ui-button .jodit-icon{height:14px;width:14px}.jodit-ui-button button{appearance:none;height:34px;min-width:34px;padding:0}.jodit-ui-button_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button_size_tiny{height:16px;min-width:16px}.jodit-ui-button_size_tiny .jodit-icon{height:8px;width:8px}.jodit-ui-button_size_tiny button{appearance:none;height:16px;min-width:16px;padding:0}.jodit-ui-button_size_tiny_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button_size_xsmall{height:22px;min-width:22px}.jodit-ui-button_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-ui-button_size_xsmall button{appearance:none;height:22px;min-width:22px;padding:0}.jodit-ui-button_size_xsmall_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button_size_small{height:28px;min-width:28px}.jodit-ui-button_size_small .jodit-icon{height:12px;width:12px}.jodit-ui-button_size_small button{appearance:none;height:28px;min-width:28px;padding:0}.jodit-ui-button_size_small_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button_size_large{height:40px;min-width:40px}.jodit-ui-button_size_large .jodit-icon{height:16px;width:16px}.jodit-ui-button_size_large button{appearance:none;height:40px;min-width:40px;padding:0}.jodit-ui-button_size_large_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-ui-button__icon{display:none}.jodit-ui-button__icon:not(:empty){display:inline-flex}.jodit-ui-button__text{display:none}.jodit-ui-button__text:not(:empty){display:inline-flex;flex-grow:1;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);justify-content:center;overflow:hidden;text-overflow:ellipsis}.jodit-ui-button_context_menu .jodit-ui-button__text{justify-content:left;padding-left:var(--jd-padding-default);position:relative}.jodit-ui-button_context_menu .jodit-ui-button__text:before{border-left:1px solid var(--jd-color-border);content:"";height:35px;left:0;position:absolute;top:calc(var(--jd-padding-default)*-1)}.jodit-ui-button__icon:not(:empty)+.jodit-ui-button__text:not(:empty){margin-left:var(--jd-padding-default)}.jodit-ui-button__icon:empty+.jodit-ui-button__text:not(:empty){padding:0 var(--jd-padding-default)}.jodit-ui-button:focus:not([disabled]){outline:1px dashed var(--jd-color-background-selection)}.jodit-ui-button_variant_outline{border:1px solid var(--jd-color-border)}.jodit-ui-button_variant_default{background-color:#e3e3e3;color:#212529}.jodit-ui-button_variant_default svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default [disabled]{opacity:.7}.jodit-ui-button_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button_variant_primary{background-color:#007bff;color:#fff}.jodit-ui-button_variant_primary svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary [disabled]{opacity:.7}.jodit-ui-button_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-ui-button_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-ui-button_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-ui-button_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-ui-button_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary [disabled]{opacity:.7}.jodit-ui-button_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button_variant_success{background-color:#28a745;color:#fff}.jodit-ui-button_variant_success svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success [disabled]{opacity:.7}.jodit-ui-button_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-ui-button_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-ui-button_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-ui-button_variant_danger{background-color:#dc3545;color:#fff}.jodit-ui-button_variant_danger svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger [disabled]{opacity:.7}.jodit-ui-button_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-ui-button_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-ui-button_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-ui-button-group{margin-bottom:var(--jd-padding-default)}.jodit-ui-button-group__label{color:var(--jd-color-label);display:block;font-size:.8em;margin-bottom:calc(var(--jd-padding-default)/4)}.jodit-ui-button-group__options{display:flex;justify-content:flex-start}.jodit-ui-button-group .jodit-ui-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.jodit-ui-button-group .jodit-ui-button+.jodit-ui-button{border-bottom-left-radius:0;border-left:1px solid var(--jd-color-button-background-hover-opacity40);border-top-left-radius:0}.jodit-ui-button-group .jodit-ui-button[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover);border-left:0;box-shadow:inset 0 0 3px 0 var(--jd-color-dark);color:var(--jd-color-dark);outline:0}.jodit-ui-button-group .jodit-ui-button[aria-pressed=true]:not([disabled])+.jodit-ui-button{border:0}:root{--jd-tooltip-color:#fff;--jd-tooltip-background-color:rgba(0,0,0,.7);--jd-tooltip-sfx-shadow:rgba(0,0,0,.15);--jd-tooltip-border-width:0;--jd-tooltip-border-color:#e5e5e5}.jodit-ui-tooltip{animation-fill-mode:forwards;animation-timing-function:ease-out;background-clip:padding-box;background-color:var(--jd-tooltip-background-color);border-radius:4px;box-shadow:0 0 0 var(--jd-tooltip-border-width) var(--jd-tooltip-border-color),0 8px 20px var(--jd-tooltip-border-width) var(--jd-tooltip-sfx-shadow);color:var(--jd-tooltip-color);font-family:var(--jd-font-default);font-size:var(--jd-font-size-small);line-height:1.4;max-width:120px;opacity:0;outline:none;pointer-events:none;position:fixed;text-rendering:optimizelegibility;transform:translate(-50%,calc(var(--jd-padding-default)/2));transition:opacity .2s ease 0s;user-select:none;white-space:normal;width:auto;z-index:var(--jd-z-index-tooltip)}@media (max-width:768px){.jodit-ui-tooltip{display:none}}.jodit-ui-tooltip__content{padding:calc(var(--jd-padding-default)/2) calc(var(--jd-padding-default)*1.5)}.jodit-ui-tooltip.jodit-ui-tooltip_visible_true{opacity:1}.jodit-ui-block{align-items:center;display:flex;justify-content:stretch;margin-bottom:var(--jd-padding-default)}.jodit-ui-block_width_full{width:100%}.jodit-ui-block_align_full{justify-content:space-between}.jodit-ui-block_align_right{justify-content:flex-end}.jodit-ui-block_padding_true{padding:var(--jd-padding-default)}.jodit-ui-label{color:var(--jd-color-label);display:block;font-size:.8em;margin-bottom:calc(var(--jd-padding-default)/4)}.jodit-ui-input{display:flex;flex-direction:column;margin-bottom:var(--jd-padding-default)}.jodit-ui-input__input{appearance:none;background-color:var(--jd-color-white);border:0;border-radius:0;box-sizing:border-box;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);height:var(--jd-input-height);line-height:1.2;outline:none;padding:0 var(--jd-padding-default);width:100%}.jodit-ui-input__input[disabled]{background-color:#f0f0f0;color:var(--jd-color-border)}.jodit-ui-input__input_has-error_true{border-color:var(--jd-color-red)}.jodit-ui-input__input:focus{outline:0}.jodit-ui-input_theme_dark .jodit-ui-input__input{background-color:var(--jd-color-gray)}.jodit-ui-input_has-error_true .jodit-ui-input__input{border-color:var(--jd-color-red)}.jodit-ui-input__error,.jodit-ui-input__label{color:var(--jd-color-label);display:block;font-size:.8em;margin-bottom:calc(var(--jd-padding-default)/4)}.jodit-ui-input__error,.jodit-ui-input_has-error_true .jodit-ui-input__label{color:var(--jd-color-error)}.jodit-ui-input__wrapper{align-items:center;background-color:var(--jd-color-white);border:1px solid var(--jd-color-border);display:flex;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-input__wrapper{min-width:140px}}.jodit-ui-input_theme_dark .jodit-ui-input__wrapper{background-color:var(--jd-color-gray);border-color:var(--jd-color-border)}.jodit-ui-input_focused_true .jodit-ui-input__wrapper{border-color:var(--jd-color-border-selected)}.jodit-ui-input__icon:not(:empty){align-items:center;display:flex;padding:0 var(--jd-padding-default)}.jodit-ui-input__icon:not(:empty) svg{height:16px;width:16px;fill:var(--jd-color-border)}.jodit-ui-input__icon:not(:empty)+.jodit-ui-input__input{padding-left:0}.jodit-ui-input__clear{align-items:center;display:flex;opacity:.8;padding:0 var(--jd-padding-default) 0 0}.jodit-ui-input__clear:active{opacity:1;transform:scale(1.1)}.jodit-ui-input__clear svg{height:12px;width:12px;fill:var(--jd-color-border)}.jodit-ui-input_theme_dark .jodit-ui-input__clear svg,.jodit-ui-input_theme_dark .jodit-ui-input__icon svg{fill:var(--jd-color-dark)}.jodit-ui-block .jodit-ui-input{margin-bottom:0}.jodit-ui-select{display:flex;flex-direction:column;margin-bottom:var(--jd-padding-default)}.jodit-ui-select__input{appearance:none;background-color:var(--jd-color-white);border:0;border-radius:0;box-sizing:border-box;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);height:var(--jd-input-height);line-height:1.2;outline:none;padding:0 var(--jd-padding-default);width:100%}.jodit-ui-select__input[disabled]{background-color:#f0f0f0;color:var(--jd-color-border)}.jodit-ui-select__input_has-error_true{border-color:var(--jd-color-red)}.jodit-ui-select__input:focus{outline:0}.jodit-ui-select_theme_dark .jodit-ui-select__input{background-color:var(--jd-color-gray)}.jodit-ui-select_has-error_true .jodit-ui-select__input{border-color:var(--jd-color-red)}.jodit-ui-select__error,.jodit-ui-select__label{color:var(--jd-color-label);display:block;font-size:.8em;margin-bottom:calc(var(--jd-padding-default)/4)}.jodit-ui-select__error,.jodit-ui-select_has-error_true .jodit-ui-select__label{color:var(--jd-color-error)}.jodit-ui-select__wrapper{align-items:center;background-color:var(--jd-color-white);border:1px solid var(--jd-color-border);display:flex;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-select__wrapper{min-width:140px}}.jodit-ui-select_theme_dark .jodit-ui-select__wrapper{background-color:var(--jd-color-gray);border-color:var(--jd-color-border)}.jodit-ui-select_focused_true .jodit-ui-select__wrapper{border-color:var(--jd-color-border-selected)}.jodit-ui-select__icon:not(:empty){align-items:center;display:flex;padding:0 var(--jd-padding-default)}.jodit-ui-select__icon:not(:empty) svg{height:16px;width:16px;fill:var(--jd-color-border)}.jodit-ui-select__icon:not(:empty)+.jodit-ui-select__input{padding-left:0}.jodit-ui-select__clear{align-items:center;display:flex;opacity:.8;padding:0 var(--jd-padding-default) 0 0}.jodit-ui-select__clear:active{opacity:1;transform:scale(1.1)}.jodit-ui-select__clear svg{height:12px;width:12px;fill:var(--jd-color-border)}.jodit-ui-select_theme_dark .jodit-ui-select__clear svg,.jodit-ui-select_theme_dark .jodit-ui-select__icon svg{fill:var(--jd-color-dark)}.jodit-ui-select__input[multiple]{height:auto;padding:0}.jodit-ui-select__input[multiple] option{padding:calc(var(--jd-padding-default)*.5) var(--jd-padding-default)}.jodit-ui-select__input:not([multiple]){background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48dGl0bGU+YXJyb3dzPC90aXRsZT48cGF0aCBkPSJNMCAwaDQuOTV2MTBIMHoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJtMS40MSA0LjY3IDEuMDctMS40OSAxLjA2IDEuNDl6TTMuNTQgNS4zMyAyLjQ4IDYuODIgMS40MSA1LjMzeiIgY2xhc3M9ImNscy0yIi8+PC9zdmc+);background-position:98% 50%;background-repeat:no-repeat;padding-right:calc(var(--jd-padding-default)*2)}.jodit-ui-select_size_tiny{margin-bottom:0}.jodit-ui-select_size_tiny .jodit-ui-select__input{--jd-height:calc(var(--jd-input-height)/1.8);height:var(--jd-height);line-height:var(--jd-height)}.jodit-ui-select_variant_outline .jodit-ui-select__wrapper{border:0}.jodit-ui-select_variant_outline .jodit-ui-select__wrapper select{outline:0}.jodit-ui-select_width_auto{width:auto}.jodit-ui-select_width_auto .jodit-ui-select__wrapper{min-width:auto}.jodit-ui-text-area{display:flex;flex-direction:column;margin-bottom:var(--jd-padding-default);width:100%}.jodit-ui-text-area__input{appearance:none;background-color:var(--jd-color-white);border:0;border-radius:0;box-sizing:border-box;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);height:var(--jd-input-height);line-height:1.2;outline:none;padding:0 var(--jd-padding-default);width:100%}.jodit-ui-text-area__input[disabled]{background-color:#f0f0f0;color:var(--jd-color-border)}.jodit-ui-text-area__input_has-error_true{border-color:var(--jd-color-red)}.jodit-ui-text-area__input:focus{outline:0}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__input{background-color:var(--jd-color-gray)}.jodit-ui-text-area_has-error_true .jodit-ui-text-area__input{border-color:var(--jd-color-red)}.jodit-ui-text-area__error,.jodit-ui-text-area__label{color:var(--jd-color-label);display:block;font-size:.8em;margin-bottom:calc(var(--jd-padding-default)/4)}.jodit-ui-text-area__error,.jodit-ui-text-area_has-error_true .jodit-ui-text-area__label{color:var(--jd-color-error)}.jodit-ui-text-area__wrapper{align-items:center;background-color:var(--jd-color-white);border:1px solid var(--jd-color-border);display:flex;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-text-area__wrapper{min-width:140px}}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__wrapper{background-color:var(--jd-color-gray);border-color:var(--jd-color-border)}.jodit-ui-text-area_focused_true .jodit-ui-text-area__wrapper{border-color:var(--jd-color-border-selected)}.jodit-ui-text-area__icon:not(:empty){align-items:center;display:flex;padding:0 var(--jd-padding-default)}.jodit-ui-text-area__icon:not(:empty) svg{height:16px;width:16px;fill:var(--jd-color-border)}.jodit-ui-text-area__icon:not(:empty)+.jodit-ui-text-area__input{padding-left:0}.jodit-ui-text-area__clear{align-items:center;display:flex;opacity:.8;padding:0 var(--jd-padding-default) 0 0}.jodit-ui-text-area__clear:active{opacity:1;transform:scale(1.1)}.jodit-ui-text-area__clear svg{height:12px;width:12px;fill:var(--jd-color-border)}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__clear svg,.jodit-ui-text-area_theme_dark .jodit-ui-text-area__icon svg{fill:var(--jd-color-dark)}.jodit-ui-text-area__wrapper{flex:1}.jodit-ui-text-area__input{height:100%;min-height:60px;padding:var(--jd-padding-default)}.jodit-ui-checkbox{align-items:center;display:flex;flex-direction:row-reverse;justify-content:flex-end;margin-bottom:var(--jd-padding-default)}.jodit-ui-checkbox__input{margin-right:var(--jd-padding-default)}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__wrapper{display:inline-block;height:34px;margin-right:var(--jd-padding-default);position:relative;width:60px}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__wrapper input{height:0;opacity:0;width:0}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__switch-slider{background-color:#ccc;border-radius:34px;cursor:pointer;inset:0;position:absolute;transition:.4s}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__switch-slider:before{background-color:#fff;border-radius:50%;bottom:4px;content:"";height:26px;left:4px;position:absolute;transition:.4s;width:26px}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_checked_true .jodit-ui-checkbox__switch-slider{background-color:#2196f3}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_checked_true .jodit-ui-checkbox__switch-slider:before{transform:translateX(26px)}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_focused_true .jodit-ui-checkbox__switch-slider{box-shadow:0 0 1px #2196f3}.jodit-ui-block .jodit-ui-checkbox{margin-bottom:0}.jodit-ui-file-input{overflow:hidden;position:relative}.jodit-ui-file-input__input{bottom:0;cursor:pointer;font-size:400px;margin:0 calc(var(--jd-padding-default)*-1) 0 0;opacity:0;padding:0;position:absolute;right:0;top:0}:root{--jd-popup-box-shadow:0 4px 1px -2px rgba(76,76,76,.2),0 3px 3px 0 rgba(76,76,76,.15),0 1px 4px 0 rgba(76,76,76,.13);--jd-popup-max-height:max(50vh,350px)}.jodit-popup{background:0 0;border:0;box-shadow:var(--jd-popup-box-shadow);display:inline-block;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;position:fixed;transform:translateZ(0);width:auto;z-index:var(--jd-z-index-popup)}.jodit-popup__content{background:var(--jd-color-background-default);font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);max-height:var(--jd-popup-max-height,400px);overflow:auto;padding:var(--jd-padding-default);overflow-scrolling:touch}.jodit-popup_padding_false .jodit-popup__content{padding:0}.jodit-popup_max-height_false .jodit-popup__content{max-height:fit-content}@keyframes a{30%{opacity:.6}60%{opacity:0}to{opacity:.6}}.jodit-progress-bar{border-radius:1px;height:2px;left:0;opacity:.7;position:absolute;top:0;z-index:2147483647}.jodit-progress-bar div{background:var(--jd-color-background-progress);height:2px;position:relative;transition:width .5s ease-out,opacity .5s linear;will-change:width,opacity}.jodit-progress-bar div:after,.jodit-progress-bar div:before{animation:a 2s ease-out 0s infinite;border-radius:100%;box-shadow:var(--jd-color-background-progress) 1px 0 6px 1px;content:"";display:inline-block;height:2px;opacity:.6;position:absolute;top:0}.jodit-progress-bar div:before{right:-80px;width:180px;clip:rect(-6px,90px,14px,-6px)}.jodit-progress-bar div:after{right:0;width:20px;clip:rect(-6px,22px,14px,var(--jd-padding-default))}:root{--jd-em-color-border:#b6d4fe;--jd-em-color-bg:#cfe2ff;--jd-em-color-color:#084298;--jd-em-border-radius:0.375rem;--jd-em-padding:0.5rem 1rem;--jd-em-font-size:1rem}.jodit-ui-messages{bottom:0;height:0;overflow:visible;position:absolute;right:0;width:0;z-index:3}.jodit-ui-message{background:var(--jd-em-color-bg);border:1px solid var(--jd-em-color-border);border-radius:var(--jd-em-border-radius);bottom:0;color:var(--jd-em-color-color);cursor:pointer;display:block;font-size:var(--jd-em-font-size);opacity:0;padding:var(--jd-em-padding);position:absolute;right:calc(var(--jd-padding-default)/2);transition:opacity .1s linear,bottom .3s linear,transform .1s ease-out;white-space:pre}.jodit-ui-message_active_true{opacity:1}.jodit-ui-message:active{transform:scale(.76)}.jodit-ui-message_variant_secondary{--jd-em-color-border:#d3d6d8;--jd-em-color-bg:#e2e3e5;--jd-em-color-color:#41464b}.jodit-ui-message_variant_danger,.jodit-ui-message_variant_error,.jodit-ui-message_variant_secondary{background:var(--jd-em-color-bg);border-color:var(--jd-em-color-border);color:var(--jd-em-color-color)}.jodit-ui-message_variant_danger,.jodit-ui-message_variant_error{--jd-em-color-border:#f5c2c7;--jd-em-color-bg:#f8d7da;--jd-em-color-color:#842029}.jodit-ui-message_variant_success{--jd-em-color-border:#badbcc;--jd-em-color-bg:#d1e7dd;--jd-em-color-color:#0f5132;background:var(--jd-em-color-bg);border-color:var(--jd-em-color-border);color:var(--jd-em-color-color)}.jodit-toolbar-collection,.jodit-toolbar-editor-collection{display:flex;flex-direction:column}.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(var(--jd-button-size) - 1px),var(--jd-color-border) var(--jd-button-size));position:relative}.jodit-toolbar-collection_mode_horizontal:after,.jodit-toolbar-editor-collection_mode_horizontal:after{background-color:var(--jd-color-background-default);bottom:0;content:"";display:block;height:1px;left:0;position:absolute;width:100%}.jodit-toolbar-collection_size_tiny,.jodit-toolbar-editor-collection_size_tiny{--jd-button-icon-size:8px}.jodit-toolbar-collection_size_tiny.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-collection_size_tiny.jodit-toolbar-editor-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_tiny.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_tiny.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 19px,var(--jd-color-border) 20px)}.jodit-toolbar-collection_size_xsmall,.jodit-toolbar-editor-collection_size_xsmall{--jd-button-icon-size:10px}.jodit-toolbar-collection_size_xsmall.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-collection_size_xsmall.jodit-toolbar-editor-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_xsmall.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_xsmall.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 25px,var(--jd-color-border) 26px)}.jodit-toolbar-collection_size_small,.jodit-toolbar-editor-collection_size_small{--jd-button-icon-size:12px}.jodit-toolbar-collection_size_small.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-collection_size_small.jodit-toolbar-editor-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_small.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_small.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 31px,var(--jd-color-border) 32px)}.jodit-toolbar-collection_size_middle,.jodit-toolbar-editor-collection_size_middle{--jd-button-icon-size:14px}.jodit-toolbar-collection_size_middle.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-collection_size_middle.jodit-toolbar-editor-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_middle.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_middle.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 37px,var(--jd-color-border) 38px)}.jodit-toolbar-collection_size_large,.jodit-toolbar-editor-collection_size_large{--jd-button-icon-size:16px}.jodit-toolbar-collection_size_large.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-collection_size_large.jodit-toolbar-editor-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_large.jodit-toolbar-collection_mode_horizontal,.jodit-toolbar-editor-collection_size_large.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 43px,var(--jd-color-border) 44px)}.jodit-toolbar-collection_mode_vertical .jodit-ui-group,.jodit-toolbar-editor-collection_mode_vertical .jodit-ui-group{background-color:transparent;border:0;flex-direction:column}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button,.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button{height:auto;min-height:var(--jd-button-size)}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button__button,.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button__button{cursor:pointer;height:auto;min-height:var(--jd-button-size);width:100%}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button__text:not(:empty),.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button__text:not(:empty){justify-content:left}.jodit-toolbar-collection .jodit-toolbar-button,.jodit-toolbar-collection .jodit-toolbar-content,.jodit-toolbar-collection .jodit-toolbar-select,.jodit-toolbar-editor-collection .jodit-toolbar-button,.jodit-toolbar-editor-collection .jodit-toolbar-content,.jodit-toolbar-editor-collection .jodit-toolbar-select{margin:var(--jd-margin-v) 1px;padding:0}.jodit-dialog .jodit-toolbar-collection_mode_horizontal,.jodit-dialog .jodit-toolbar-editor-collection_mode_horizontal{background-image:none}:root{--jd-button-trigger-size:14px}.jodit-toolbar-button{align-items:center;border:1px solid transparent;border-radius:var(--jd-border-radius-default);display:flex;height:34px;justify-content:center;min-width:34px;overflow:hidden}.jodit-toolbar-button__icon{display:none}.jodit-toolbar-button__icon:not(:empty){display:inline-flex}.jodit-toolbar-button__text{display:none}.jodit-toolbar-button__text:not(:empty){display:inline-flex;flex-grow:1;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);justify-content:center;overflow:hidden;text-overflow:ellipsis}.jodit-toolbar-button_context_menu .jodit-toolbar-button__text{justify-content:left;padding-left:var(--jd-padding-default);position:relative}.jodit-toolbar-button_context_menu .jodit-toolbar-button__text:before{border-left:1px solid var(--jd-color-border);content:"";height:35px;left:0;position:absolute;top:calc(var(--jd-padding-default)*-1)}.jodit-toolbar-button__icon:not(:empty)+.jodit-toolbar-button__text:not(:empty){margin-left:var(--jd-padding-default)}.jodit-toolbar-button__icon:empty+.jodit-toolbar-button__text:not(:empty){padding:0 var(--jd-padding-default);padding:0}.jodit-toolbar-button .jodit-icon{height:14px;width:14px}.jodit-toolbar-button button{appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-button_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-button_size_tiny{height:16px;min-width:16px}.jodit-toolbar-button_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-button_size_tiny button{appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-button_size_tiny_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-button_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-button_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-button_size_xsmall button{appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-button_size_xsmall_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-button_size_small{height:28px;min-width:28px}.jodit-toolbar-button_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-button_size_small button{appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-button_size_small_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-button_size_large{height:40px;min-width:40px}.jodit-toolbar-button_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-button_size_large button{appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-button_size_large_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-button__button{align-items:center;appearance:none;background:0 0;border:0;border-radius:var(--jd-border-radius-default);box-shadow:none;box-sizing:border-box;color:var(--jd-color-text-icons);cursor:pointer;display:inline-flex;font-style:normal;justify-content:center;outline:0;padding:0;padding:0 var(--jd-padding-default);position:relative;text-align:center;text-decoration:none;text-transform:none;user-select:none}.jodit-toolbar-button__button:focus-visible:not([disabled]),.jodit-toolbar-button__button:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-button__button:active:not([disabled]),.jodit-toolbar-button__button[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-button__button[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-button__button[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-button__trigger{align-items:center;border-radius:0 var(--jd-border-radius-default) var(--jd-border-radius-default) 0;cursor:pointer;display:flex;height:100%;justify-content:center;opacity:.4;--jd-button-trigger-size:14px;width:calc(var(--jd-button-trigger-size, 14px) + 2px)}.jodit-toolbar-button__trigger:focus-visible:not([disabled]),.jodit-toolbar-button__trigger:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-button__trigger:active:not([disabled]),.jodit-toolbar-button__trigger[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-button__trigger[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-button__trigger[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-button__trigger svg{width:calc(var(--jd-button-trigger-size, 14px) - 4px)}.jodit-toolbar-button_size_tiny .jodit-toolbar-button__trigger{--jd-button-trigger-size:8px;width:calc(var(--jd-button-trigger-size, 8px) + 2px)}.jodit-toolbar-button_size_tiny .jodit-toolbar-button__trigger svg{width:calc(var(--jd-button-trigger-size, 8px) - 4px)}.jodit-toolbar-button_size_xsmall .jodit-toolbar-button__trigger{--jd-button-trigger-size:10px;width:calc(var(--jd-button-trigger-size, 10px) + 2px)}.jodit-toolbar-button_size_xsmall .jodit-toolbar-button__trigger svg{width:calc(var(--jd-button-trigger-size, 10px) - 4px)}.jodit-toolbar-button_size_small .jodit-toolbar-button__trigger{--jd-button-trigger-size:12px;width:calc(var(--jd-button-trigger-size, 12px) + 2px)}.jodit-toolbar-button_size_small .jodit-toolbar-button__trigger svg{width:calc(var(--jd-button-trigger-size, 12px) - 4px)}.jodit-toolbar-button_size_large .jodit-toolbar-button__trigger{--jd-button-trigger-size:16px;width:calc(var(--jd-button-trigger-size, 16px) + 2px)}.jodit-toolbar-button_size_large .jodit-toolbar-button__trigger svg{width:calc(var(--jd-button-trigger-size, 16px) - 4px)}.jodit-toolbar-button_with-trigger_true .jodit-toolbar-button__button{border-radius:var(--jd-border-radius-default) 0 0 var(--jd-border-radius-default)}.jodit-toolbar-button_with-trigger_true:hover:not([disabled]){border-color:var(--jd-color-border)}.jodit-toolbar-button_stroke_false svg{stroke:none}.jodit-toolbar-content{align-items:center;appearance:none;background:0 0;border:1px solid transparent;border-radius:var(--jd-border-radius-default);box-shadow:none;box-sizing:border-box;color:var(--jd-color-text-icons);cursor:pointer;display:inline-flex;font-style:normal;height:34px;justify-content:center;min-width:34px;outline:0;padding:0;position:relative;text-align:center;text-decoration:none;text-transform:none;user-select:none}.jodit-toolbar-content:focus-visible:not([disabled]),.jodit-toolbar-content:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-content:active:not([disabled]),.jodit-toolbar-content[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-content[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-content[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-content .jodit-icon{height:14px;width:14px}.jodit-toolbar-content button{appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-content_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-content_size_tiny{height:16px;min-width:16px}.jodit-toolbar-content_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-content_size_tiny button{appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-content_size_tiny_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-content_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-content_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-content_size_xsmall button{appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-content_size_xsmall_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-content_size_small{height:28px;min-width:28px}.jodit-toolbar-content_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-content_size_small button{appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-content_size_small_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-content_size_large{height:40px;min-width:40px}.jodit-toolbar-content_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-content_size_large button{appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-content_size_large_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-content__icon{display:none}.jodit-toolbar-content__icon:not(:empty){display:inline-flex}.jodit-toolbar-content__text{display:none}.jodit-toolbar-content__text:not(:empty){display:inline-flex;flex-grow:1;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);justify-content:center;overflow:hidden;text-overflow:ellipsis}.jodit-toolbar-content_context_menu .jodit-toolbar-content__text{justify-content:left;padding-left:var(--jd-padding-default);position:relative}.jodit-toolbar-content_context_menu .jodit-toolbar-content__text:before{border-left:1px solid var(--jd-color-border);content:"";height:35px;left:0;position:absolute;top:calc(var(--jd-padding-default)*-1)}.jodit-toolbar-content__icon:not(:empty)+.jodit-toolbar-content__text:not(:empty){margin-left:var(--jd-padding-default)}.jodit-toolbar-content__icon:empty+.jodit-toolbar-content__text:not(:empty){padding:0 var(--jd-padding-default)}.jodit-toolbar-content:focus:not([disabled]){outline:1px dashed var(--jd-color-background-selection)}.jodit-toolbar-content_variant_outline{border:1px solid var(--jd-color-border)}.jodit-toolbar-content_variant_default{background-color:#e3e3e3;color:#212529}.jodit-toolbar-content_variant_default svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default [disabled]{opacity:.7}.jodit-toolbar-content_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-toolbar-content_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-toolbar-content_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-toolbar-content_variant_primary{background-color:#007bff;color:#fff}.jodit-toolbar-content_variant_primary svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary [disabled]{opacity:.7}.jodit-toolbar-content_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-toolbar-content_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-toolbar-content_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-toolbar-content_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-toolbar-content_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary [disabled]{opacity:.7}.jodit-toolbar-content_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-toolbar-content_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-toolbar-content_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-toolbar-content_variant_success{background-color:#28a745;color:#fff}.jodit-toolbar-content_variant_success svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success [disabled]{opacity:.7}.jodit-toolbar-content_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-toolbar-content_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-toolbar-content_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-toolbar-content_variant_danger{background-color:#dc3545;color:#fff}.jodit-toolbar-content_variant_danger svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger [disabled]{opacity:.7}.jodit-toolbar-content_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-toolbar-content_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-toolbar-content_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-toolbar-content:hover:not([disabled]){background-color:transparent;opacity:1;outline:0}.jodit-toolbar-select{--jd-color-button-background-hover-opacity40:hsla(0,0%,86%,.2);--jd-color-button-background-hover-opacity60:hsla(0,0%,86%,.1);align-items:center;border:1px solid transparent;border-radius:var(--jd-border-radius-default);cursor:pointer;display:flex;height:34px;justify-content:center;justify-content:space-between;min-width:34px;min-width:100px;overflow:hidden}.jodit-toolbar-select__icon{display:none}.jodit-toolbar-select__icon:not(:empty){display:inline-flex}.jodit-toolbar-select__text{display:none}.jodit-toolbar-select__text:not(:empty){display:inline-flex;flex-grow:1;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);justify-content:center;overflow:hidden;text-overflow:ellipsis}.jodit-toolbar-select_context_menu .jodit-toolbar-select__text{justify-content:left;padding-left:var(--jd-padding-default);position:relative}.jodit-toolbar-select_context_menu .jodit-toolbar-select__text:before{border-left:1px solid var(--jd-color-border);content:"";height:35px;left:0;position:absolute;top:calc(var(--jd-padding-default)*-1)}.jodit-toolbar-select__icon:not(:empty)+.jodit-toolbar-select__text:not(:empty){margin-left:var(--jd-padding-default)}.jodit-toolbar-select__icon:empty+.jodit-toolbar-select__text:not(:empty){padding:0 var(--jd-padding-default);padding:0}.jodit-toolbar-select .jodit-icon{height:14px;width:14px}.jodit-toolbar-select button{appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-select_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-select_size_tiny{height:16px;min-width:16px}.jodit-toolbar-select_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-select_size_tiny button{appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-select_size_tiny_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-select_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-select_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-select_size_xsmall button{appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-select_size_xsmall_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-select_size_small{height:28px;min-width:28px}.jodit-toolbar-select_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-select_size_small button{appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-select_size_small_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-select_size_large{height:40px;min-width:40px}.jodit-toolbar-select_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-select_size_large button{appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-select_size_large_text-icons_true button{padding:0 var(--jd-padding-default)}.jodit-toolbar-select__button{align-items:center;appearance:none;background:0 0;border:0;border-radius:var(--jd-border-radius-default);box-shadow:none;box-sizing:border-box;color:var(--jd-color-text-icons);cursor:pointer;display:inline-flex;font-style:normal;justify-content:center;outline:0;padding:0;padding:0 var(--jd-padding-default);position:relative;text-align:center;text-decoration:none;text-transform:none;user-select:none}.jodit-toolbar-select__button:focus-visible:not([disabled]),.jodit-toolbar-select__button:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-select__button:active:not([disabled]),.jodit-toolbar-select__button[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-select__button[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-select__button[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__trigger{align-items:center;border-radius:0 var(--jd-border-radius-default) var(--jd-border-radius-default) 0;cursor:pointer;display:flex;height:100%;justify-content:center;opacity:.4;--jd-button-trigger-size:14px;width:calc(var(--jd-button-trigger-size, 14px) + 2px)}.jodit-toolbar-select__trigger:focus-visible:not([disabled]),.jodit-toolbar-select__trigger:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-select__trigger:active:not([disabled]),.jodit-toolbar-select__trigger[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-select__trigger[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-select__trigger[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__trigger svg{width:calc(var(--jd-button-trigger-size, 14px) - 4px)}.jodit-toolbar-select_size_tiny .jodit-toolbar-select__trigger{--jd-button-trigger-size:8px;width:calc(var(--jd-button-trigger-size, 8px) + 2px)}.jodit-toolbar-select_size_tiny .jodit-toolbar-select__trigger svg{width:calc(var(--jd-button-trigger-size, 8px) - 4px)}.jodit-toolbar-select_size_xsmall .jodit-toolbar-select__trigger{--jd-button-trigger-size:10px;width:calc(var(--jd-button-trigger-size, 10px) + 2px)}.jodit-toolbar-select_size_xsmall .jodit-toolbar-select__trigger svg{width:calc(var(--jd-button-trigger-size, 10px) - 4px)}.jodit-toolbar-select_size_small .jodit-toolbar-select__trigger{--jd-button-trigger-size:12px;width:calc(var(--jd-button-trigger-size, 12px) + 2px)}.jodit-toolbar-select_size_small .jodit-toolbar-select__trigger svg{width:calc(var(--jd-button-trigger-size, 12px) - 4px)}.jodit-toolbar-select_size_large .jodit-toolbar-select__trigger{--jd-button-trigger-size:16px;width:calc(var(--jd-button-trigger-size, 16px) + 2px)}.jodit-toolbar-select_size_large .jodit-toolbar-select__trigger svg{width:calc(var(--jd-button-trigger-size, 16px) - 4px)}.jodit-toolbar-select_with-trigger_true .jodit-toolbar-button__button{border-radius:var(--jd-border-radius-default) 0 0 var(--jd-border-radius-default)}.jodit-toolbar-select_with-trigger_true:hover:not([disabled]){border-color:var(--jd-color-border)}.jodit-toolbar-select_stroke_false svg{stroke:none}.jodit-toolbar-select:focus-visible:not([disabled]),.jodit-toolbar-select:hover:not([disabled]){background-color:var(--jd-color-button-background-hover);opacity:1;outline:0}.jodit-toolbar-select:active:not([disabled]),.jodit-toolbar-select[aria-pressed=true]:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity40);outline:0}.jodit-toolbar-select[aria-pressed=true]:hover:not([disabled]){background-color:var(--jd-color-button-background-hover-opacity60)}.jodit-toolbar-select[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__text:not(:empty){justify-content:left}.jodit-toolbar-select__button{flex:1}.jodit-toolbar__box:not(:empty){--jd-color-background-default:var(--jd-color-panel);background-color:var(--jd-color-background-default);border-bottom:1px solid var(--jd-color-border);border-radius:var(--jd-border-radius-default) var(--jd-border-radius-default) 0 0;overflow:hidden}.jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{background-color:var(--jd-color-panel)}.jodit-dialog{border:0;box-sizing:border-box;display:none;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);height:0;position:absolute;width:0;will-change:left,top,width,height}.jodit-dialog_moved_true{user-select:none}.jodit-dialog *{box-sizing:border-box}.jodit-dialog .jodit_elfinder,.jodit-dialog .jodit_elfinder *{box-sizing:initial}.jodit-dialog__overlay{background-color:rgba(0,0,0,.5);display:none;height:100%;left:0;overflow:auto;position:fixed;text-align:center;top:0;white-space:nowrap;width:100%;z-index:var(--jd-z-index-dialog-overlay)}.jodit-dialog_static_true .jodit-dialog__overlay{display:none}.jodit-dialog_active_true,.jodit-dialog_modal_true .jodit-dialog__overlay{display:block}.jodit-dialog__panel{background-color:#fff;display:flex;flex-flow:column nowrap;left:0;max-height:100%;max-width:100%;min-height:100px;min-width:200px;position:fixed;top:0;z-index:var(--jd-z-index-dialog);--jd-box-shadow-blur:calc(var(--jd-padding-default)*2);--jd-box-shadow-1:0 var(--jd-padding-default) var(--jd-box-shadow-blur) rgba(0,0,0,.19);box-shadow:var(--jd-box-shadow-1),0 6px 6px rgba(0,0,0,.23);text-align:left;white-space:normal}@media (max-width:480px){.jodit-dialog:not(.jodit-dialog_adaptive_false) .jodit-dialog__panel{height:100%!important;left:0!important;max-width:100%;top:0!important;width:100%!important}}.jodit-dialog_static_true{box-sizing:border-box;display:block;height:auto;position:relative;width:auto;z-index:inherit}.jodit-dialog_static_true .jodit-dialog__panel{border:1px solid var(--jd-color-border);box-shadow:none;left:auto!important;position:relative;top:auto!important;width:100%!important;z-index:inherit}.jodit-dialog_theme_dark,.jodit-dialog_theme_dark .jodit-dialog__panel{background-color:var(--jd-dark-background-darknes);color:var(--jd-dark-text-color)}.jodit-dialog__header{border-bottom:1px solid var(--jd-color-border);cursor:move;display:flex;justify-content:space-between;min-height:50px;text-align:left}.jodit-dialog__header-title,.jodit-dialog__header-toolbar{align-items:center;display:flex;flex-shrink:3;font-size:18px;font-weight:400;line-height:48px;margin:0;padding:0 var(--jd-padding-default);vertical-align:top}@media (max-width:480px){.jodit-dialog__header-toolbar{padding-left:0}}.jodit-dialog__header-button{color:#222;flex-basis:48px;font-size:28px;height:48px;line-height:48px;text-align:center;text-decoration:none;transition:background-color .2s ease 0s}.jodit-dialog__header-button:hover{background-color:var(--jd-color-background-button-hover)}.jodit-dialog__header .jodit_toolbar{background:transparent;border:0;box-shadow:none}.jodit-dialog__header .jodit_toolbar>li.jodit-toolbar-button .jodit-input{padding-left:var(--jd-padding-default);width:auto}@media (max-width:480px){.jodit-dialog:not(.jodit-dialog_adaptive_false) .jodit-dialog__header{flex-direction:column}}.jodit-dialog_slim_true .jodit-dialog__header{min-height:10px}.jodit-dialog_slim_true .jodit-dialog__header-title,.jodit-dialog_slim_true .jodit-dialog__header-toolbar{padding:0 calc(var(--jd-padding-default)/4)}.jodit-dialog_theme_dark .jodit-dialog__header{border-color:var(--jd-color-dark)}.jodit-dialog_fullsize_true .jodit-dialog__header{cursor:default}.jodit-dialog__content{flex:1;min-height:100px;overflow:auto}.jodit-dialog__content .jodit-form__group{margin-bottom:calc(var(--jd-padding-default)*1.5);padding:0 var(--jd-padding-default)}.jodit-dialog__content .jodit-form__group:first-child{margin-top:var(--jd-padding-default)}.jodit-dialog__content .jodit-form__group .jodit-input_group{border-collapse:separate;display:table;width:100%}.jodit-dialog__content .jodit-form__group .jodit-input_group>*{display:table-cell;height:34px;vertical-align:middle}.jodit-dialog__content .jodit-form__group .jodit-input_group>input{margin:0!important}.jodit-dialog__content .jodit-form__group .jodit-input_group>input:not([class*=col-]){width:100%}.jodit-dialog__content .jodit-form__group .jodit-input_group-buttons{font-size:0;vertical-align:middle;white-space:nowrap;width:1%}.jodit-dialog__content .jodit-form__group .jodit-input_group-buttons>.jodit-button{border:1px solid var(--jd-color-border);border-radius:0;height:34px;line-height:34px;margin-left:-1px}.jodit-dialog__footer{display:none;flex-wrap:nowrap;justify-content:space-between;padding:var(--jd-padding-default)}.jodit-dialog__footer button{margin-right:calc(var(--jd-padding-default)/2)}.jodit-dialog__footer button:last-child{margin-right:0}.jodit-dialog__column{display:flex}.jodit-dialog__resizer{display:none;position:relative}.jodit-dialog__resizer svg{bottom:0;cursor:nwse-resize;height:12px;overflow:hidden;position:absolute;right:0;width:12px;fill:var(--jd-color-gray-dark);user-select:none}.jodit-dialog_resizable_true .jodit-dialog__resizer{display:block}@media (max-width:480px){.jodit-dialog__resizer{display:none}}.jodit-dialog_prompt{max-width:300px;min-width:200px;padding:var(--jd-padding-default);word-break:break-all}.jodit-dialog_prompt label{display:block;margin-bottom:calc(var(--jd-padding-default)/2)}.jodit-dialog_alert{max-width:300px;min-width:200px;padding:var(--jd-padding-default);word-break:break-all}.jodit-dialog_footer_true .jodit-dialog__footer{display:flex}.jodit_fullsize .jodit-dialog__panel{height:100%!important;inset:0!important;width:100%!important}.jodit_fullsize .jodit-dialog__panel .jodit-dialog__resizer{display:none}.jodit-dialog .jodit-ui-messages{z-index:var(--jd-z-index-dialog)}.jodit-context-menu{background:0 0;border:0;box-shadow:var(--jd-popup-box-shadow);display:inline-block;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;position:fixed;transform:translateZ(0);width:auto;z-index:var(--jd-z-index-popup);z-index:var(--jd-z-index-context-menu)}.jodit-context-menu,.jodit-context-menu__content{font-family:var(--jd-font-default);font-size:var(--jd-font-size-default)}.jodit-context-menu__content{background:var(--jd-color-background-default);max-height:var(--jd-popup-max-height,400px);overflow:auto;padding:var(--jd-padding-default);overflow-scrolling:touch}.jodit-context-menu_padding_false .jodit-context-menu__content{padding:0}.jodit-context-menu_max-height_false .jodit-context-menu__content{max-height:fit-content}.jodit-context-menu .jodit-ui-button{display:flex}.jodit-context-menu button{width:100%}.jodit-context-menu_theme_dark{background-color:var(--jd-dark-background-color)}:root{--jd-image-editor-resizer-border-color:#05ff00;--jd-image-editor-resizer-target-size:padding-default;--jd-image-editor-resizer-target-border-color:#383838;--jd-image-editor-resizer-target-bg-color:#8c7878}.jodit-image-editor{height:100%;overflow:hidden;padding:var(--jd-padding-default);width:100%}@media (max-width:768px){.jodit-image-editor{height:auto}}.jodit-image-editor>div,.jodit-image-editor>div>div{height:100%}@media (max-width:768px){.jodit-image-editor>div,.jodit-image-editor>div>div{height:auto;min-height:200px}}.jodit-image-editor *{box-sizing:border-box}.jodit-image-editor .jodit-image-editor__slider-title{background-color:#f9f9f9;border-bottom:1px solid hsla(0,0%,62%,.31);color:#333;cursor:pointer;font-weight:700;line-height:1em;padding:.8em 1em;text-overflow:ellipsis;text-shadow:#f3f3f3 0 1px 0;user-select:none;white-space:nowrap}.jodit-image-editor .jodit-image-editor__slider-title svg{display:inline-block;margin-right:var(--jd-padding-default);vertical-align:middle;width:16px}.jodit-image-editor .jodit-image-editor__slider-content{display:none}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-title{background-color:#5d5d5d;color:#fff;text-shadow:#000 0 1px 0}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-title svg{fill:#fff}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-content{display:block}.jodit-image-editor__area{background-color:#eee;background-image:linear-gradient(45deg,var(--jd-color-border) 25%,transparent 25%,transparent 75%,var(--jd-color-border) 75%,var(--jd-color-border)),linear-gradient(45deg,var(--jd-color-border) 25%,transparent 25%,transparent 75%,var(--jd-color-border) 75%,var(--jd-color-border));background-position:0 0,15px 15px;background-size:30px 30px;display:none;height:100%;overflow:hidden;position:relative;user-select:none;width:100%}.jodit-image-editor__area.jodit-image-editor_active{display:block}.jodit-image-editor__area .jodit-image-editor__box{height:100%;overflow:hidden;pointer-events:none;position:relative;z-index:1}.jodit-image-editor__area .jodit-image-editor__box img{max-height:100%;max-width:100%;user-select:none}.jodit-image-editor__area .jodit-image-editor__croper,.jodit-image-editor__area .jodit-image-editor__resizer{background-repeat:no-repeat;border:1px solid #fff;box-shadow:0 0 11px #000;height:100px;left:20px;pointer-events:none;position:absolute;top:var(--jd-padding-default);width:100px;z-index:2}.jodit-image-editor__area .jodit-image-editor__croper i.jodit_bottomright,.jodit-image-editor__area .jodit-image-editor__resizer i.jodit_bottomright{background-color:var(--jd-image-editor-resizer-target-bg-color);border:1px solid var(--jd-image-editor-resizer-target-border-color);border-radius:50%;bottom:calc(var(--jd-padding-default)*-1);box-shadow:0 0 11px #000;cursor:se-resize;display:inline-block;height:20px;pointer-events:all;position:absolute;right:calc(var(--jd-padding-default)*-1);width:20px;z-index:4}.jodit-image-editor__area .jodit-image-editor__croper i.jodit_bottomright:active,.jodit-image-editor__area .jodit-image-editor__resizer i.jodit_bottomright:active{border:1px solid #ff0}.jodit-image-editor__area.jodit-image-editor__area_crop{background:#eee;height:100%;line-height:100%;position:relative;text-align:center}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box{height:100%;line-height:100%;overflow:visible;pointer-events:all;text-align:left}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box img{height:100%;max-height:100%;max-width:100%;width:100%}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box:after{background:hsla(0,0%,100%,.3);content:"";inset:0;margin:auto;position:absolute;z-index:1}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box .jodit-image-editor__croper{cursor:move;pointer-events:all}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box .jodit-image-editor__croper i.jodit-image-editor__sizes{background:rgba(0,0,0,.2);border-radius:.4em;bottom:-30px;color:#fff;display:block;font-size:12px;left:100%;padding:9px 6px;position:absolute;text-align:center;text-shadow:none;white-space:pre}.jodit-image-editor__area.jodit-image-editor__area_crop.jodit-image-editor_active{align-items:center;display:flex;justify-content:center}.jodit-file-browser-files{display:none;height:100%;overflow-anchor:auto;position:relative;vertical-align:top}.jodit-file-browser-files .jodit-button{border-radius:0}.jodit-file-browser-files_loading_true:before{content:"";height:100%;left:0;position:absolute;top:0;width:100%}.jodit-file-browser-files_loading_true:after{animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;content:"";display:inline-block;height:var(--jd-icon-loader-size);left:50%;margin-left:calc(var(--jd-icon-loader-size)/-2);margin-top:calc(var(--jd-icon-loader-size)/-2);opacity:.7;position:absolute;top:50%;vertical-align:middle;width:var(--jd-icon-loader-size);will-change:transform}.jodit-file-browser-files::-webkit-scrollbar{width:calc(var(--jd-padding-default)/2)}.jodit-file-browser-files::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-files::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}.jodit-file-browser-files_active_true{align-content:flex-start;display:flex;flex-wrap:wrap;overflow-y:auto;padding:calc(var(--jd-padding-default)/2);width:100%}.jodit-file-browser-files__item{align-items:center;border:1px solid var(--jd-color-border);display:flex;font-size:0;height:var(--jd-col-size);justify-content:center;margin:calc(var(--jd-padding-default)/2);overflow:hidden;position:relative;text-align:center;transition:border .1s linear,bottom .1s linear;width:var(--jd-col-size)}@media (max-width:480px){.jodit-file-browser-files__item{width:calc(50% - var(--jd-padding-default))}}.jodit-file-browser-files__item img{max-width:100%}.jodit-file-browser-files__item:hover{border-color:#433b5c}.jodit-file-browser-files__item_active_true{background-color:var(--jd-color-border-active);border-color:var(--jd-color-border-selected)}.jodit-file-browser-files__item_active_true .jodit-file-browser-files__item-info{background-color:var(--jd-color-border-active);color:#fff;text-shadow:none}.jodit-file-browser-files__item-info{background-color:var(--jd-info-background);bottom:0;color:#333;font-size:14px;left:0;line-height:16px;opacity:.85;overflow:visible;padding:.3em .6em;position:absolute;right:0;text-align:left;text-shadow:#eee 0 1px 0;transition:opacity .4s ease;white-space:normal}.jodit-file-browser-files__item-info>span{display:block;font-size:.75em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.jodit-file-browser-files__item-info>span.jodit-file-browser-files__item-info-filename{font-size:.9em;font-weight:700}.jodit-file-browser-files__item:hover:not(.jodit-file-browser-files__item_active_true) .jodit-file-browser-files__item-info{bottom:-100px}.jodit-file-browser-files_view_list{scroll-behavior:smooth}.jodit-file-browser-files_view_list a{border-width:0 0 1px;display:block;height:26px;line-height:26px;margin:0;text-align:left;white-space:nowrap;width:100%}.jodit-file-browser-files_view_list a img{display:inline-block;margin-left:4px;max-width:16px;min-width:16px;vertical-align:middle}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info{background-color:transparent;display:inline-block;font-size:0;height:100%;line-height:inherit;margin-left:4px;padding:0;position:static;vertical-align:middle;width:calc(100% - 20px)}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info>span{display:inline-block;font-size:12px;height:100%}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filename{width:50%}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filechanged,.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filesize{width:25%}.jodit-file-browser-files_view_list a:hover{background-color:#433b5c}.jodit-file-browser-files_view_list a:hover .jodit-file-browser-files__item-info{color:#fff;text-shadow:none}.jodit-file-browser-files_view_list a:before{content:"";display:inline-block;height:100%;vertical-align:middle}:root{--jd-color-folder-title:#b1b1b1}.jodit-file-browser-tree{--jd-color-background-filebrowser-folders:#3f3f3f;display:none;height:100%;overflow-anchor:auto;position:relative;vertical-align:top}.jodit-file-browser-tree .jodit-button{border-radius:0}.jodit-file-browser-tree_loading_true:before{content:"";height:100%;left:0;position:absolute;top:0;width:100%}.jodit-file-browser-tree_loading_true:after{animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;content:"";display:inline-block;height:var(--jd-icon-loader-size);left:50%;margin-left:calc(var(--jd-icon-loader-size)/-2);margin-top:calc(var(--jd-icon-loader-size)/-2);opacity:.7;position:absolute;top:50%;vertical-align:middle;width:var(--jd-icon-loader-size);will-change:transform}.jodit-file-browser-tree::-webkit-scrollbar{width:calc(var(--jd-padding-default)/2)}.jodit-file-browser-tree::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-tree::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}.jodit-file-browser-tree_active_true{background-color:var(--jd-color-background-filebrowser-folders);display:flex;flex-direction:column;max-width:290px;min-width:200px;overflow-y:auto;width:var(--jd-first-column);z-index:2}@media (max-width:480px){.jodit-file-browser-tree_active_true{height:100px;max-width:100%;width:auto}}.jodit-file-browser-tree_active_true::-webkit-scrollbar{width:calc(var(--jd-padding-default)/2)}.jodit-file-browser-tree_active_true::-webkit-scrollbar-track{box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-tree_active_true::-webkit-scrollbar-thumb{background-color:hsla(0,0%,50%,.5);outline:1px solid #708090}.jodit-file-browser-tree__item{align-items:center;border-bottom:1px solid #474747;color:var(--jd-color-folder-title);display:flex;justify-content:space-between;min-height:38px;padding:calc(var(--jd-padding-default)/2) var(--jd-padding-default);position:relative;text-decoration:none;transition:background-color .2s ease 0s;word-break:break-all}.jodit-file-browser-tree__item-title{color:var(--jd-color-folder-title);flex:1}.jodit-file-browser-tree__item .jodit-icon_folder{align-items:center;display:flex;height:calc(var(--jd-icon-size) + 4px);justify-content:center;margin-left:calc(var(--jd-padding-default)/2);opacity:.3;width:calc(var(--jd-icon-size) + 4px)}.jodit-file-browser-tree__item .jodit-icon_folder svg{height:var(--jd-icon-size);width:var(--jd-icon-size);fill:var(--jd-color-folder-title)!important;stroke:var(--jd-color-folder-title)!important}.jodit-file-browser-tree__item .jodit-icon_folder:hover{background:#696969}.jodit-file-browser-tree__item:hover{background-color:var(--jd-color-background-button-hover)}.jodit-file-browser-tree__item:hover-title{color:var(--jd-color-text)}.jodit-file-browser-tree__item:hover i.jodit-icon_folder{opacity:.6}.jodit-file-browser-tree__source-title{background:#5a5a5a;border-bottom:1px solid #484848;color:#969696;display:block;font-size:12px;padding:2px 4px;position:relative;user-select:none;word-break:break-all}a+.jodit-file-browser-tree__source-title{margin-top:var(--jd-padding-default)}:root{--jd-first-column:31%;--jd-cols:4;--jd-info-background:#e9e9e9;--jd-icon-size:12px;--jd-col-size:150px}.jodit-file-browser{display:flex;font-family:var(--jd-font-default);height:100%}.jodit-file-browser_no-files_true{padding:var(--jd-padding-default)}@media (max-width:480px){.jodit-file-browser{flex-flow:column-reverse}}.jodit-dialog .jodit-dialog__header-title.jodit-file-browser__title-box{align-items:center;display:flex;padding-left:var(--jd-padding-default)}.jodit-file-browser-preview{align-items:center;display:flex;height:100%;justify-content:center;margin:auto;max-height:100%;max-width:min(100%,1000px);min-height:min(100%,500px);min-width:400px;position:relative;text-align:center}@media (max-width:768px){.jodit-file-browser-preview{height:100%;max-height:100%;max-width:100%;min-height:auto;min-width:auto}}.jodit-file-browser-preview__box{align-items:center;display:flex;flex-grow:1;justify-content:center}.jodit-file-browser-preview__navigation{cursor:pointer;height:100%;left:0;position:absolute;top:0}.jodit-file-browser-preview__navigation_arrow_next{left:auto;right:0}.jodit-file-browser-preview__navigation svg{height:45px;position:relative;top:50%;width:45px;fill:#9e9ba7;transform:translateY(-50%);transition:fill .3s linear}.jodit-file-browser-preview__navigation:hover svg{fill:#000}.jodit-file-browser-preview img{max-height:100%;max-width:100%}.jodit-status-bar{align-items:center;background-color:var(--jd-color-panel);border-radius:0 0 var(--jd-border-radius-default) var(--jd-border-radius-default);color:var(--jd-color-text-icons);display:flex;font-size:var(--jd-font-size-small);height:20px;justify-content:flex-start;overflow:hidden;padding:0 calc(var(--jd-padding-default)/2);text-transform:uppercase}.jodit-status-bar_resize-handle_true{padding-right:14px}.jodit-status-bar:before{content:"";flex:auto;order:1}.jodit-status-bar .jodit-status-bar__item{line-height:1.5714em;margin:0 var(--jd-padding-default) 0 0;order:0;padding:0}.jodit-status-bar .jodit-status-bar__item,.jodit-status-bar .jodit-status-bar__item>span{font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);font-size:var(--jd-font-size-small)}.jodit-status-bar .jodit-status-bar__item.jodit-status-bar__item-right{margin:0 0 0 var(--jd-padding-default);order:2}.jodit-status-bar .jodit-status-bar__item a{border-radius:3px;cursor:default;text-decoration:none}.jodit-status-bar .jodit-status-bar__item a:hover{background-color:var(--jd-color-background-gray);text-decoration:none}.jodit-status-bar a.jodit-status-bar-link{cursor:pointer}.jodit-status-bar a.jodit-status-bar-link,.jodit-status-bar a.jodit-status-bar-link:hover,.jodit-status-bar a.jodit-status-bar-link:visited{background-color:transparent;color:var(--jd-color-text-icons)}.jodit-status-bar a.jodit-status-bar-link:hover{text-decoration:underline}.jodit-workplace+.jodit-status-bar:not(:empty){border-top:1px solid var(--jd-color-border)}.jodit_disabled .jodit-status-bar{opacity:.4}.jodit-drag-and-drop__file-box,.jodit_uploadfile_button{border:1px dashed var(--jd-color-gray);margin:var(--jd-padding-default) 0;overflow:hidden;padding:25px 0;position:relative;text-align:center;width:100%}.jodit-drag-and-drop__file-box:hover,.jodit_uploadfile_button:hover{background-color:var(--jd-color-background-button-hover)}.jodit-drag-and-drop__file-box input,.jodit_uploadfile_button input{cursor:pointer;font-size:400px;inset:0;margin:0;opacity:0;padding:0;position:absolute}@media (max-width:768px){.jodit-drag-and-drop__file-box{max-width:100%;min-width:var(--jd-width-input-min);width:auto}}.jodit-about{padding:20px}.jodit-about a{color:#459ce7;text-decoration:none}.jodit-about a:focus,.jodit-about a:hover{color:#23527c;outline:0;text-decoration:underline}.jodit-about div{margin-bottom:calc(var(--jd-padding-default)/2)}:root{--jd-anl-color-new-line:var(--jd-color-border);--jd-anl-handle-size:20px;--jd-anl-handle-offset:calc(100% - var(--jd-anl-handle-size))}.jodit-add-new-line{display:block;height:1px;outline:none;position:fixed;top:0;z-index:1}.jodit-add-new-line,.jodit-add-new-line *{box-sizing:border-box}.jodit-add-new-line:after{background-color:var(--jd-anl-color-new-line);content:"";display:block;height:1px;width:100%}.jodit-add-new-line span{align-items:center;background:var(--jd-color-background-button-hover-opacity30);border:1px solid var(--jd-anl-color-new-line);cursor:pointer;display:flex;height:var(--jd-anl-handle-size);justify-content:center;left:var(--jd-anl-handle-offset);position:absolute;top:0;transform:translateY(-50%);width:var(--jd-anl-handle-size)}.jodit-add-new-line span:hover{background:var(--jd-color-background-button-hover)}.jodit-add-new-line svg{width:calc(var(--jd-anl-handle-size)/2);fill:var(--jd-anl-color-new-line)}.jodit-source__mode .jodit-add-new-line{display:none!important}:root{--jd-color-picker-cell-size:24px}.jodit-color-picker{margin:0;text-align:left;user-select:none}.jodit-color-picker__group{display:flex;flex-wrap:wrap;margin-bottom:calc(var(--jd-padding-default)/2);max-width:calc(var(--jd-color-picker-cell-size)*10);white-space:normal}.jodit-color-picker__color-item{border:1px solid transparent;display:block;height:var(--jd-color-picker-cell-size);text-align:center;text-decoration:none;vertical-align:middle;width:var(--jd-color-picker-cell-size)}.jodit-color-picker__color-item:hover{border-color:#000}.jodit-color-picker__color-item:active,.jodit-color-picker__color-item_active_true{border:2px solid var(--jd-color-border-selected)}.jodit-color-picker__native svg{display:inline-block;height:16px;margin-right:4px;width:16px}.jodit-color-picker__native input{appearance:none;border:none;height:18px;padding:0;width:18px}.jodit-color-picker__native input[type=color]::-webkit-color-swatch-wrapper{padding:0}.jodit-color-picker__native input input[type=color]::-webkit-color-swatch{border:none}.jodit-tabs{--jd-box-shadow-tabs:0 0 #0000,0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);font-family:var(--jd-font-default);font-size:var(--jd-font-size-default)}.jodit-tabs .jodit-tabs__buttons{background-color:var(--jd-color-background-light-gray);border-radius:var(--jd-border-radius-default);display:flex;justify-content:center;margin-bottom:var(--jd-padding-default);margin-top:calc(var(--jd-padding-default)/2);padding:calc(var(--jd-padding-default)/2)}.jodit-tabs .jodit-tabs__buttons .jodit-ui-button{color:var(--jd-color-placeholder)}.jodit-tabs .jodit-tabs__buttons .jodit-ui-button svg{fill:var(--jd-color-placeholder)}.jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]),.jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]){box-shadow:var(--jd-box-shadow-tabs);color:var(--jd-color-text-icons)}.jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]),.jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) .jodit-ui-button__text,.jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]),.jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) .jodit-ui-button__text{background-color:var(--jd-color-background-default)}.jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) svg,.jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) svg{fill:var(--jd-color-text-icons)}.jodit-tabs .jodit-tabs__buttons>*{cursor:pointer;margin-left:calc(var(--jd-padding-default)/2)}.jodit-tabs .jodit-tabs__buttons>:only-of-type{width:100%}.jodit-tabs .jodit-tabs__buttons>:first-child{margin-left:0}@media (max-width:480px){.jodit-tabs .jodit-tabs__buttons{display:block}.jodit-tabs .jodit-tabs__buttons>*{margin-left:0;width:100%}}.jodit-tabs__button{max-width:210px;min-width:80px}.jodit-tabs__button .jodit-ui-button__text{flex:1;justify-content:space-around;white-space:nowrap}.jodit-tabs__button_columns_3{width:33.33333%}.jodit-tabs__button_columns_2{width:50%}.jodit-tabs .jodit-tabs__wrapper .jodit-tab{display:none}.jodit-tabs .jodit-tabs__wrapper .jodit-tab.jodit-tab_active{display:block}.jodit-tabs .jodit-tabs__wrapper .jodit-tab.jodit-tab_empty{min-height:100px;min-width:220px}.jodit-dialog_theme_dark .jodit-tabs .jodit-tabs__buttons,.jodit_theme_dark .jodit-tabs .jodit-tabs__buttons{background-color:var(--jd-dark-background-color);border-radius:var(--jd-border-radius-default)}.jodit-dialog_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) .jodit-ui-button__text,.jodit-dialog_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) .jodit-ui-button__text,.jodit_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) .jodit-ui-button__text,.jodit_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) .jodit-ui-button__text{color:var(--jd-dark-toolbar-color)}.jodit-dialog_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) svg,.jodit-dialog_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) svg,.jodit_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button:active:not([disabled]) svg,.jodit_theme_dark .jodit-tabs .jodit-tabs__buttons .jodit-ui-button[aria-pressed=true]:not([disabled]) svg{fill:var(--jd-color-text-icons)}.jodit_fullsize-box_true{overflow:visible!important;position:static!important;z-index:var(--jd-z-index-full-size)!important}body.jodit_fullsize-box_true,html.jodit_fullsize-box_true{height:0!important;overflow:hidden!important;width:0!important}html.jodit_fullsize-box_true{position:fixed!important}.jodit_fullsize{inset:0;max-width:none!important;position:absolute;z-index:var(--jd-z-index-full-size)}.jodit_fullsize .toolbar{width:100%!important}.jodit_fullsize .jodit__area,.jodit_fullsize .jodit_editor{height:100%}.jodit-ui-image-position-tab__lockMargin>svg,.jodit-ui-image-position-tab__lockSize>svg,.jodit-ui-image-properties-form__lockMargin>svg,.jodit-ui-image-properties-form__lockSize>svg{display:inline-block;height:var(--jd-icon-middle-size);overflow:hidden;width:var(--jd-icon-middle-size);fill:var(--jd-color-dark);line-height:var(--jd-icon-middle-size);transform-origin:0 0!important;vertical-align:middle}.jodit-ui-image-position-tab__view-box,.jodit-ui-image-properties-form__view-box{padding:var(--jd-padding-default)}.jodit-ui-image-position-tab__imageView,.jodit-ui-image-properties-form__imageView{align-items:center;background-color:var(--jd-color-background-light-gray);display:flex;height:var(--jd-width-default);justify-content:center;margin:0 0 var(--jd-padding-default);padding:0}.jodit-ui-image-position-tab__imageView img,.jodit-ui-image-properties-form__imageView img{max-height:100%;max-width:100%}.jodit-ui-image-position-tab__imageSizes.jodit-form__group,.jodit-ui-image-properties-form__imageSizes.jodit-form__group{align-items:center;flex-direction:row;margin:0;min-width:auto;padding:0}.jodit-ui-image-position-tab__imageSizes.jodit-form__group a,.jodit-ui-image-properties-form__imageSizes.jodit-form__group a{cursor:pointer;display:inline-block}.jodit-ui-image-position-tab .jodit-form__group,.jodit-ui-image-properties-form .jodit-form__group{padding:0}.jodit-ui-image-position-tab__tabsBox,.jodit-ui-image-properties-form__tabsBox{padding:0 var(--jd-padding-default)}.jodit-dialog_theme_dark .jodit-ui-image-properties-form__imageView,.jodit_theme_dark .jodit-ui-image-properties-form__imageView{background-color:var(--jd-dark-background-color)}.jodit-ui-image-properties-form_lock_true:before{background-color:var(--jd-color-button-background-hover-opacity60);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:3}.jodit-ui-image-properties-form_lock_true:after{animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;background-size:var(--jd-icon-loader-size);content:"";display:inline-block;height:var(--jd-icon-loader-size);left:50%;margin-left:-10px;margin-top:-10px;position:absolute;top:50%;vertical-align:middle;width:var(--jd-icon-loader-size);will-change:transform}.jodit-popup-inline__container{min-width:700px;z-index:1300}.jodit-paste-storage{max-width:600px;padding:var(--jd-padding-default)}@media (max-width:768px){.jodit-paste-storage{max-width:100%}}.jodit-paste-storage>div{border:1px solid var(--jd-color-border);max-height:300px;max-width:100%}.jodit-paste-storage>div:first-child{margin-bottom:var(--jd-padding-default)}.jodit-paste-storage>div:first-child a{border:1px solid transparent;box-sizing:border-box;color:var(--jd-color-default);display:block;margin:0;max-width:100%;outline:none;overflow:hidden;padding:calc(var(--jd-padding-default)/2);text-decoration:none;text-overflow:ellipsis;white-space:pre}.jodit-paste-storage>div:first-child a.jodit_active{background-color:var(--jd-dark-background-color);color:var(--jd-color-white)}.jodit-paste-storage>div:first-child a:focus{outline:none}.jodit-paste-storage>div:last-child{overflow:auto;padding:var(--jd-padding-default)}.jodit-paste-storage>div:last-child li,.jodit-paste-storage>div:last-child ul{margin:0}.jodit-placeholder{color:var(--jd-color-placeholder);display:block;left:0;padding:var(--jd-padding-default);pointer-events:none;position:absolute;top:0;user-select:none!important;width:100%;z-index:1}.jodit__preview-box table{border:none;border-collapse:collapse;empty-cells:show;margin-bottom:1em;margin-top:1em;max-width:100%}.jodit__preview-box table tr{user-select:none}.jodit__preview-box table tr td,.jodit__preview-box table tr th{border:1px solid var(--jd-color-border);min-width:2em;padding:.4em;user-select:text;vertical-align:middle}.jodit-table-resizer{cursor:col-resize;margin-left:calc(var(--jd-padding-default)/-2);padding-left:calc(var(--jd-padding-default)/2);padding-right:calc(var(--jd-padding-default)/2);position:absolute;z-index:3}.jodit-table-resizer:after{border:0;content:"";display:block;height:100%;width:0}.jodit-table-resizer_moved{background-color:var(--jd-color-background-selection);z-index:2}.jodit-table-resizer_moved:after{border-right:1px solid moved}[data-jodit_iframe_wrapper]{display:block;position:relative;user-select:none}[data-jodit_iframe_wrapper] iframe{position:relative}[data-jodit_iframe_wrapper]:after{background:transparent;content:"";cursor:pointer;display:block;inset:0;position:absolute;z-index:1}[data-jodit_iframe_wrapper][data-jodit-wrapper_active=true] iframe{z-index:2}.jodit_lock [data-jodit-wrapper_active=true] iframe{z-index:1}:root{--jd-viewer-width:70px;--jd-viewer-height:24px;--jd-resizer-handle-size:10px;--jd-resizer-border-color:#98c1f1;--jd-resizer-handle-color:#5ba4f3;--jd-resizer-handle-hover-color:#537ebb}.jodit-resizer{font-size:0;height:100px;left:0;outline:3px solid var(--jd-resizer-border-color);pointer-events:none;position:absolute;top:0;width:100px}.jodit-resizer,.jodit-resizer *{box-sizing:border-box}.jodit-resizer>span{background-color:var(--jd-color-placeholder);color:var(--jd-color-white);display:inline-block;font-size:12px;height:var(--jd-viewer-height);left:50%;line-height:var(--jd-viewer-height);margin-left:calc(var(--jd-viewer-width)/-2);margin-top:calc(var(--jd-viewer-height)/-2);opacity:0;overflow:visible;position:absolute;text-align:center;top:50%;transition:opacity .2s linear;width:var(--jd-viewer-width)}.jodit-resizer>div{background-color:var(--jd-resizer-handle-color);display:inline-block;height:var(--jd-resizer-handle-size);pointer-events:all;position:absolute;width:var(--jd-resizer-handle-size);z-index:4}.jodit-resizer>div:hover{background-color:var(--jd-resizer-handle-hover-color)}.jodit-resizer>div:first-child{cursor:nwse-resize;left:calc(var(--jd-resizer-handle-size)/-2);top:calc(var(--jd-resizer-handle-size)/-2)}.jodit-resizer>div:nth-child(2){cursor:nesw-resize;right:calc(var(--jd-resizer-handle-size)/-2);top:calc(var(--jd-resizer-handle-size)/-2)}.jodit-resizer>div:nth-child(3){bottom:calc(var(--jd-resizer-handle-size)/-2);cursor:nwse-resize;right:calc(var(--jd-resizer-handle-size)/-2)}.jodit-resizer>div:nth-child(4){bottom:calc(var(--jd-resizer-handle-size)/-2);cursor:nesw-resize;left:calc(var(--jd-resizer-handle-size)/-2)}@media (max-width:768px){.jodit-resizer>div :root{--jd-resizer-handle-size:calc(var(--jd-resizer-handle-size)*2)}}:root{--jd-height-search:30px;--jd-width-search:320px;--jd-width-search-input-box:60%;--jd-width-search-count-box:15%;--jd-transform-button-active:0.95;--jd-timeout-button-active:0.1s}.jodit-ui-search{height:0;position:absolute;right:0;top:0;width:0}.jodit-ui-search_sticky_true{position:fixed}.jodit-ui-search__box{background-color:var(--jd-color-panel);border:solid var(--jd-color-border);border-width:0 0 1px 1px;display:flex;max-width:100vw;padding:calc(var(--jd-padding-default)/2);position:absolute;right:0;width:var(--jd-width-search)}.jodit-ui-search__box input{background-color:transparent;border:0;height:100%;margin:0;outline:none;padding:0 var(--jd-padding-default);width:100%}.jodit-ui-search__box input[data-ref=replace]{display:none}.jodit-ui-search__box input:not(:focus)+input:not(:focus){border-top:1px solid var(--jd-color-border)}.jodit-ui-search__buttons,.jodit-ui-search__counts,.jodit-ui-search__inputs{height:var(--jd-height-search)}.jodit-ui-search__inputs{padding-right:calc(var(--jd-padding-default)/2);width:var(--jd-width-search-input-box)}.jodit-ui-search__counts{border-left:1px solid var(--jd-color-border);color:var(--jd-color-border);width:var(--jd-width-search-count-box)}.jodit-ui-search__buttons,.jodit-ui-search__counts{align-items:center;display:flex;justify-content:center}.jodit-ui-search__buttons{flex:1;padding-left:0}.jodit-ui-search__buttons button{background-color:transparent;border:1px solid transparent;height:100%;margin-right:1%;width:32%}.jodit-ui-search__buttons button[data-ref=replace-btn]{border:1px solid var(--jd-color-border);display:none;margin-top:2px;width:100%}.jodit-ui-search__buttons button:hover{background-color:var(--jd-color-background-button-hover)}.jodit-ui-search__buttons button:focus{border:1px solid var(--jd-color-background-selection-opacity50)}.jodit-ui-search__buttons button:active{border:1px solid var(--jd-color-background-selection);transform:scale(var(--jd-transform-button-active))}.jodit-ui-search_empty-query_true [data-ref=next],.jodit-ui-search_empty-query_true [data-ref=prev]{opacity:.5}.jodit-ui-search_replace_true .jodit-ui-search__counts,.jodit-ui-search_replace_true .jodit-ui-search__inputs{height:calc(var(--jd-height-search)*2)}.jodit-ui-search_replace_true .jodit-ui-search__counts input,.jodit-ui-search_replace_true .jodit-ui-search__inputs input{height:50%;transition:background-color var(--jd-timeout-button-active) linear}.jodit-ui-search_replace_true .jodit-ui-search__counts input:focus,.jodit-ui-search_replace_true .jodit-ui-search__inputs input:focus{box-shadow:inset 0 0 3px 0 var(--jd-color-border)}.jodit-ui-search_replace_true .jodit-ui-search__counts input[data-ref=replace],.jodit-ui-search_replace_true .jodit-ui-search__inputs input[data-ref=replace]{display:block}.jodit-ui-search_replace_true .jodit-ui-search__buttons{flex-wrap:wrap}.jodit-ui-search_replace_true .jodit-ui-search__buttons button[data-ref=replace-btn]{display:block}::highlight(jodit-search-result),[jd-tmp-selection]{background-color:var(--jd-color-background-selection);color:var(--jd-color-text-selection)}.jodit-container:not(.jodit_inline){min-height:100px}.jodit-container:not(.jodit_inline) .jodit-workplace{display:flex;flex-direction:column;height:auto;min-height:50px;overflow:hidden}.jodit-container:not(.jodit_inline) .jodit-editor__resize{position:relative}.jodit-container:not(.jodit_inline) .jodit-editor__resize svg{bottom:0;cursor:nwse-resize;height:12px;overflow:hidden;position:absolute;right:0;width:12px;fill:var(--jd-color-gray-dark);user-select:none}.jodit-source{background-color:var(--jd-color-source-area);display:none;flex:auto;overflow:auto;position:relative}.jodit-source,.jodit-source .jodit-source__mirror-fake{min-height:100%}.jodit-source *{font:12px/normal Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace}.jodit-container.jodit-source__mode .jodit-wysiwyg,.jodit-container.jodit-source__mode .jodit-wysiwyg_iframe{display:none!important}.jodit-container.jodit-source__mode .jodit-source{display:block!important}.jodit-container.jodit_split_mode .jodit-workplace{flex-flow:row nowrap}.jodit-container.jodit_split_mode .jodit-source,.jodit-container.jodit_split_mode .jodit-wysiwyg,.jodit-container.jodit_split_mode .jodit-wysiwyg_iframe{display:block!important;flex:1;width:50%}.jodit-source__mirror{background:var(--jd-color-source-area);border:0;box-shadow:none;box-sizing:border-box;color:#f0f0f0;height:100%;line-height:1.5;font:12px/normal Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace;margin:0;min-height:100%;outline:none;overflow:auto;padding:var(--jd-padding-default);resize:none;tab-size:2em;white-space:pre-wrap;width:100%;z-index:2}.jodit-source__mirror::selection{background:var(--jd-color-selection-area)}.jodit_sticky-dummy_toolbar{display:none}.jodit_sticky>.jodit-toolbar__box{border-bottom:1px solid var(--jd-color-border);left:auto;position:fixed;position:sticky;top:0;z-index:3}.jodit_sticky .jodit_sticky-dummy_toolbar{display:block}.jodit-symbols{padding:var(--jd-padding-default);width:460px}.jodit-symbols__container{display:flex}.jodit-symbols__container_table{width:88%}.jodit-symbols__container_preview{width:12%}.jodit-symbols__preview{border:1px solid var(--jd-color-border);font-size:34px;padding:20px 0;text-align:center}.jodit-symbols__table{border:0;border-spacing:0;table-layout:fixed}.jodit-symbols__table td{padding:0}.jodit-symbols__table td a{border:1px solid transparent;box-sizing:border-box;color:var(--jd-color-text);cursor:pointer;display:inline-block;font-size:16px;height:calc(var(--jd-height-element-default)*1.2);line-height:calc(var(--jd-height-element-default)*1.2);text-align:center;text-decoration:none;vertical-align:top;width:calc(var(--jd-width-element-default)*1.2)}.jodit-symbols__table td a:focus,.jodit-symbols__table td a:hover{outline:2px solid var(--jd-color-border)}.jodit-ui-ai-assistant{min-width:460px;padding:var(--jd-padding-default);width:100%}@media (max-width:768px){.jodit-ui-ai-assistant{min-width:100%}}.jodit-ui-ai-assistant__body{margin-bottom:10px}.jodit-ui-ai-assistant__prompt-row{align-items:flex-start;display:flex;margin-bottom:10px}.jodit-ui-ai-assistant__prompt-row-label{margin-right:10px}.jodit-ui-ai-assistant__prompt-row-input{flex:1;margin-right:10px}.jodit-ui-ai-assistant__prompt-row .jodit-icon_ai_assistant{cursor:pointer;height:22px;width:22px}.jodit-ui-ai-assistant__prompt-row .jodit-ui-button{margin-right:10px}.jodit-ui-ai-assistant__prompt-row .jodit-ui-button_ai_assistant{margin-right:0;margin-top:20px}.jodit-ui-ai-assistant__results{border-color:var(--jd-color-label);border-style:solid;border-width:1px;height:300px;line-height:1.5;max-width:460px;min-height:300px;min-width:100%;overflow:auto;padding:var(--jd-padding-default);position:relative}.jodit-ui-ai-assistant__results p{margin:0 0 10px}.jodit-ui-ai-assistant__close{cursor:pointer;padding:10px;position:absolute;right:0;top:0}.jodit-ui-ai-assistant_hide_true{display:none}.jodit-ui-ai-assistant__spinner:before{animation:b .6s linear infinite;border:1px solid #ccc;border-radius:50%;border-top-color:#8817c3;box-sizing:border-box;content:"";height:30px;left:50%;margin-left:-15px;margin-top:-15px;position:absolute;top:50%;width:30px}.jodit-ui-ai-assistant__error{color:var(--jd-color-error)}.jodit-context table,.jodit-wysiwyg table{border:none;border-collapse:collapse;empty-cells:show;margin-bottom:1em;margin-top:1em;max-width:100%}.jodit-context table tr,.jodit-wysiwyg table tr{user-select:none}.jodit-context table tr td,.jodit-context table tr th,.jodit-wysiwyg table tr td,.jodit-wysiwyg table tr th{border:1px solid var(--jd-color-border);min-width:2em;padding:.4em;user-select:text;vertical-align:middle}.jodit-form__inserter{--jd-color-table-cell-background-hover:var(--jd-color-button-background-hover)}.jodit-form__inserter .jodit-form__table-creator-box{display:flex}@media (max-width:768px){.jodit-form__inserter .jodit-form__table-creator-box{flex-direction:column}}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container{font-size:0;margin:0;min-width:180px;padding:0}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span{border:1px solid var(--jd-color-border);box-sizing:border-box;cursor:pointer;display:inline-block;height:var(--jd-height-element-default);margin-bottom:2px;margin-left:2px;vertical-align:top;width:var(--jd-width-element-default)}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span:first-child{margin-left:0}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span.jodit_hovered{background:var(--jd-color-table-cell-background-hover);border-color:var(--jd-color-table-cell-background-hover)}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options{font-size:var(--jd-font-size-default)}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options label{padding-top:0;text-align:left}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options label input{margin-right:var(--jd-padding-default)}.jodit-form__inserter label{font-size:14px;margin:0;padding:8px;text-align:center}.jodit-xpath{align-items:center;display:flex;margin-left:calc(var(--jd-padding-default)/-2)}.jodit-xpath__item{display:flex;height:var(--jd-font-size-small);line-height:calc(var(--jd-font-size-small) - 1px)}.jodit-xpath__item a{color:var(--jd-color-default);font-size:var(--jd-font-size-small);margin-left:2px;outline:0;padding:0 3px}:root{--jd-color-white:#fff;--jd-color-gray:#dadada;--jd-color-gray-dark:#a5a5a5;--jd-color-dark:#4c4c4c;--jd-color-blue:#b5d6fd;--jd-color-light-blue:rgba(181,214,253,.5);--jd-color-red:#ff3b3b;--jd-color-light-red:rgba(255,59,59,.4);--jd-color-default:var(--jd-color-dark);--jd-color-text:#222;--jd-color-label:var(--jd-color-gray-dark);--jd-color-error:var(--jd-color-red);--jd-color-border:var(--jd-color-gray);--jd-color-border-dark:var(--jd-color-dark);--jd-color-border-selected:#1e88e5;--jd-color-border-active:#b5b5b5;--jd-color-selection:var(--jd-color-dark);--jd-color-selection-area:#bdbdbd;--jd-color-separator:var(--jd-color-border);--jd-color-placeholder:var(--jd-color-gray-dark);--jd-color-panel:#f9f9f9;--jd-color-resizer:#c8c8c8;--jd-color-background-default:var(--jd-color-white);--jd-color-background-light-gray:#f5f5f6;--jd-color-background-gray:var(--jd-color-gray);--jd-color-background-gray-hover:#f8f8f8;--jd-color-background-button-hover:#ecebe9;--jd-color-background-button-hover-opacity30:hsla(40,7%,92%,.3);--jd-color-background-progress:#b91f1f;--jd-color-background-active:#2196f3;--jd-color-background-selection:#b5d6fd;--jd-color-text-selection:var(--jd-color-white);--jd-color-background-selection-opacity50:rgba(181,214,253,.995);--jd-color-source-area:#323232;--jd-color-button-background-hover:#dcdcdc;--jd-color-button-background-hover-opacity40:hsla(0,0%,86%,.4);--jd-color-button-background-hover-opacity60:hsla(0,0%,86%,.6);--jd-font-default:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;--jd-font-size-default:14px;--jd-font-size-small:11px;--jd-color-text-icons:rgba(0,0,0,.75);--jd-color-icon:var(--jd-color-dark);--jd-padding-default:8px;--jd-border-radius-default:3px;--jd-icon-tiny-size:8px;--jd-icon-xsmall-size:10px;--jd-icon-small-size:12px;--jd-icon-middle-size:14px;--jd-icon-large-size:16px;--jd-z-index-full-size:100000;--jd-z-index-popup:10000001;--jd-z-index-dialog-overlay:20000003;--jd-z-index-dialog:20000004;--jd-z-index-context-menu:30000005;--jd-z-index-tooltip:30000006;--jd-icon-loader-size:48px;--jd-width-element-default:18px;--jd-height-element-default:18px;--jd-dark-background-color:#575757;--jd-dark-background-ligher:silver;--jd-dark-background-darknes:#353535;--jd-dark-border-color:#444;--jd-dark-text-color:#d1cccc;--jd-dark-text-color-opacity80:hsla(0,5%,81%,.8);--jd-dark-text-color-opacity50:hsla(0,5%,81%,.5);--jd-dark-icon-color:silver;--jd-dark-toolbar-color:#5f5c5c;--jd-dark-toolbar-seperator-color1:rgba(81,81,81,.41);--jd-dark-toolbar-seperator-color2:#686767;--jd-dark-toolbar-seperator-color-opacity80:hsla(0,0%,41%,.8);--jd-dark-toolbar-seperator-color3:hsla(0,0%,41%,.75);--jd-dark-color-border-selected:#152f5f;--jd-width-default:180px;--jd-width-input-min:var(--jd-width-default);--jd-input-height:32px;--jd-button-icon-size:14px;--jd-margin-v:2px;--jd-button-df-size:calc((var(--jd-button-icon-size) - 4px)*2);--jd-button-size:calc(var(--jd-button-icon-size) + var(--jd-button-df-size) + var(--jd-margin-v)*2);--jd-focus-input-box-shadow:0 0 0 0.05rem rgba(0,123,255,.25)}.jodit-wysiwyg{outline:0}.jodit-wysiwyg ::selection,.jodit-wysiwyg::selection{background:#b5d6fd;color:#4c4c4c}.jodit-container:not(.jodit_inline) .jodit-wysiwyg{margin:0;outline:0;overflow-x:auto;padding:8px;position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg img{max-width:100%;position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media{position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media *{position:relative;z-index:0}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media:before{content:"";inset:0;position:absolute;z-index:1}:root{--jd-switche-width:60px;--jd-switche-height:32px;--jd-switche-slider-margin:4px;--jd-switche-slider-size:calc(var(--jd-switche-height) - var(--jd-switche-slider-margin)*2)}.jodit-form{color:var(--jd-color-default);font-family:var(--jd-font-default);font-size:var(--jd-font-size-default)}.jodit-form.jodit_error{border-color:var(--jd-color-error);box-shadow:inset 0 0 3px 0 hsla(0,0%,74%,.3)}@media (max-width:768px){.jodit-form{min-width:150px}}.jodit-form button{background:#d6d6d6;border:none;color:var(--jd-color-dark);cursor:pointer;font-size:16px;height:36px;line-height:1;margin-bottom:var(--jd-padding-default);margin-top:var(--jd-padding-default);outline:none;padding:var(--jd-padding-default);text-decoration:none;transition:background .2s ease 0s}.jodit-form button:hover{background-color:var(--jd-color-background-button-hover);color:var(--jd-color-dark)}.jodit-form button:active{background:var(--jd-color-background-button-hover);color:var(--jd-color-dark)}.jodit-form label{align-items:center;display:flex;margin-bottom:var(--jd-padding-default);text-align:left;white-space:nowrap}.jodit-form label:last-child{margin-bottom:0}.jodit-form .jodit-form__center{justify-content:center}.jodit .jodit-input,.jodit .jodit-select,.jodit .jodit-textarea{appearance:none;background-color:var(--jd-color-white);border:1px solid var(--jd-color-border);border-radius:0;box-sizing:border-box;font-family:var(--jd-font-default);font-size:var(--jd-font-size-default);height:var(--jd-input-height);line-height:1.2;outline:none;padding:0 var(--jd-padding-default);width:100%}.jodit .jodit-input[disabled],.jodit .jodit-select[disabled],.jodit .jodit-textarea[disabled]{background-color:#f0f0f0;color:var(--jd-color-border)}.jodit .jodit-input_has-error_true,.jodit .jodit-select_has-error_true,.jodit .jodit-textarea_has-error_true{border-color:var(--jd-color-red)}.jodit .jodit-input:focus{border-color:#66afe9;outline:0}.jodit-checkbox{border:0;cursor:pointer;height:16px;margin:0 calc(var(--jd-padding-default)/2) 0 0;outline:none;padding:0;position:relative;width:16px;z-index:2}.jodit-select{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 4.95 10'%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:%23444}%3C/style%3E%3C/defs%3E%3Ctitle%3Earrows%3C/title%3E%3Cpath d='M0 0h4.95v10H0z' style='fill:%23fff'/%3E%3Cpath d='m1.41 4.67 1.07-1.49 1.06 1.49zM3.54 5.33 2.48 6.82 1.41 5.33z' class='cls-2'/%3E%3C/svg%3E");background-position:98% 50%;background-repeat:no-repeat;padding-right:calc(var(--jd-padding-default)*2)}.jodit-textarea{height:auto}.jodit-form__group,.jodit-textarea{min-width:var(--jd-width-input-min)}.jodit-form__group{display:flex;flex-direction:column;margin-bottom:var(--jd-padding-default)}.jodit-form__group label{margin-bottom:calc(var(--jd-padding-default)/2)}.jodit-button{align-items:center;background-color:var(--jd-color-background-gray);border:0;border-radius:.25rem;color:var(--jd-color-default);cursor:pointer;display:inline-flex;height:calc(var(--jd-padding-default)*4);justify-content:center;line-height:1;margin:0;padding:0 var(--jd-padding-default);position:relative;text-decoration:none;user-select:none;width:auto}.jodit-button svg{display:inline-block;height:24px;width:24px}.jodit-button svg+span{margin-left:calc(var(--jd-padding-default)/2)}.jodit-button:active,.jodit-button:focus{outline:0}.jodit-button.disabled{opacity:.7}.jodit-buttons{display:flex;flex-wrap:nowrap;justify-content:space-between;margin-bottom:var(--jd-padding-default)}.jodit-button .jodit_icon,.jodit-button svg,.jodit-dialog__header .jodit_icon,.jodit-dialog__header svg{display:inline-block;height:16px;vertical-align:middle;width:16px}.jodit-switcher-wrapper{align-items:center;display:flex}.jodit-switcher-wrapper .jodit-switcher+span{margin-left:var(--jd-padding-default)}.jodit-switcher{display:inline-block;height:var(--jd-switche-height);position:relative;width:var(--jd-switche-width)}.jodit-switcher input{height:0;opacity:0;width:0}.jodit-switcher .jodit-switcher__slider{background-color:var(--jd-color-gray);border-radius:var(--jd-switche-height);cursor:pointer;inset:0;position:absolute;transition:.4s}.jodit-switcher .jodit-switcher__slider:before{background-color:#fff;border-radius:50%;bottom:var(--jd-switche-slider-margin);content:"";height:var(--jd-switche-slider-size);left:var(--jd-switche-slider-margin);position:absolute;transition:.4s;width:var(--jd-switche-slider-size)}input:checked+.jodit-switcher__slider{background-color:var(--jd-color-background-active)}input:checked+.jodit-switcher__slider:before{transform:translateX(calc(var(--jd-switche-width) - var(--jd-switche-slider-margin)*2 - var(--jd-switche-slider-size)))}input:focus+.jodit-switcher__slider{box-shadow:0 0 1px var(--jd-color-background-active)}.jodit-button-group{display:flex}.jodit-button-group input{display:none}.jodit-button-group button{display:flex;flex:1;justify-content:center;text-align:center}.jodit-button-group button+button{margin-left:-1px}.jodit-button-group button:first-child,.jodit-button-group input:first-child+button{border-bottom-right-radius:0;border-right:0;border-top-right-radius:0}.jodit-button-group button:last-child,.jodit-button-group input:last-child+button{border-bottom-left-radius:0;border-left:0;border-top-left-radius:0}.jodit-button-group input[type=checkbox]:checked+button,.jodit-button-group input[type=checkbox]:not(:checked)+button+button{background-image:none;box-shadow:inset 0 2px 4px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.05)}.jodit_text_icons .jodit_icon{font-size:var(--jd-font-size-default);width:auto}.jodit_text_icons .jodit_icon:first-letter{text-transform:uppercase}.jodit_text_icons .jodit-tabs .jodit-tabs__buttons>a{font-family:var(--jd-font-default);width:auto}.jodit_text_icons .jodit-tabs .jodit-tabs__buttons>a i{width:auto}.jodit_text_icons.jodit-dialog .jodit-button,.jodit_text_icons.jodit-dialog .jodit-dialog__header a{color:var(--jd-color-text-icons);font-family:var(--jd-font-default);padding:var(--jd-padding-default);width:auto}.jodit_text_icons.jodit-dialog .jodit-button .jodit_icon,.jodit_text_icons.jodit-dialog .jodit-dialog__header a .jodit_icon{width:auto}.jodit-grid{display:flex;width:100%}.jodit-grid.jodit-grid_column{flex-direction:column}@media (max-width:480px){.jodit-grid.jodit-grid_xs-column{flex-direction:column}}.jodit-grid [class*=jodit_col-]{flex:1 1 auto}.jodit-grid .jodit_col-lg-5-5{width:100%}.jodit-grid .jodit_col-lg-4-5{width:80%}.jodit-grid .jodit_col-lg-3-5{width:60%}.jodit-grid .jodit_col-lg-2-5{width:40%}.jodit-grid .jodit_col-lg-1-5{width:20%}.jodit-grid .jodit_col-lg-4-4{width:100%}.jodit-grid .jodit_col-lg-3-4{width:75%}.jodit-grid .jodit_col-lg-2-4{width:50%}.jodit-grid .jodit_col-lg-1-4{width:25%}@media (max-width:992px){.jodit-grid .jodit_col-md-5-5{width:100%}.jodit-grid .jodit_col-md-4-5{width:80%}.jodit-grid .jodit_col-md-3-5{width:60%}.jodit-grid .jodit_col-md-2-5{width:40%}.jodit-grid .jodit_col-md-1-5{width:20%}.jodit-grid .jodit_col-md-4-4{width:100%}.jodit-grid .jodit_col-md-3-4{width:75%}.jodit-grid .jodit_col-md-2-4{width:50%}.jodit-grid .jodit_col-md-1-4{width:25%}}@media (max-width:768px){.jodit-grid .jodit_col-sm-5-5{width:100%}.jodit-grid .jodit_col-sm-4-5{width:80%}.jodit-grid .jodit_col-sm-3-5{width:60%}.jodit-grid .jodit_col-sm-2-5{width:40%}.jodit-grid .jodit_col-sm-1-5{width:20%}.jodit-grid .jodit_col-sm-4-4{width:100%}.jodit-grid .jodit_col-sm-3-4{width:75%}.jodit-grid .jodit_col-sm-2-4{width:50%}.jodit-grid .jodit_col-sm-1-4{width:25%}}@media (max-width:480px){.jodit-grid .jodit_col-xs-5-5{width:100%}.jodit-grid .jodit_col-xs-4-5{width:80%}.jodit-grid .jodit_col-xs-3-5{width:60%}.jodit-grid .jodit_col-xs-2-5{width:40%}.jodit-grid .jodit_col-xs-1-5{width:20%}.jodit-grid .jodit_col-xs-4-4{width:100%}.jodit-grid .jodit_col-xs-3-4{width:75%}.jodit-grid .jodit_col-xs-2-4{width:50%}.jodit-grid .jodit_col-xs-1-4{width:25%}}@keyframes b{to{transform:rotate(1turn)}}.jodit-icon_loader{animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;display:inline-block;height:var(--jd-icon-loader-size);vertical-align:middle;width:var(--jd-icon-loader-size);will-change:transform}.jodit-icon{background:50% no-repeat;background-size:contain;height:14px;overflow:visible;width:14px;fill:var(--jd-color-icon);transform-origin:0 0!important}.jodit-icon,.jodit-icon_close{stroke:var(--jd-color-icon)}svg.jodit-icon{height:auto;isolation:isolate}.jodit-icon_text{font-size:14px}.jodit,.jodit *,.jodit-container,.jodit-container *{box-sizing:border-box}.jodit .jodit-workplace,.jodit-container .jodit-workplace{overflow:auto;position:relative}.jodit .jodit-workplace .jodit-wysiwyg,.jodit .jodit-workplace .jodit-wysiwyg_iframe,.jodit-container .jodit-workplace .jodit-wysiwyg,.jodit-container .jodit-workplace .jodit-wysiwyg_iframe{height:100%;width:100%}.jodit-wysiwyg [contenteditable=false]{cursor:default}.jodit-container:not(.jodit_inline){background-color:var(--jd-color-background-light-gray);border:1px solid var(--jd-color-border);border-radius:var(--jd-border-radius-default)}.jodit-container:not(.jodit_inline) .jodit-workplace{background-color:var(--jd-color-background-default);border:0 solid var(--jd-color-border);max-height:100%}.jodit-container:not(.jodit_inline).jodit_disabled{background:var(--jd-color-background-gray)}.jodit-container:not(.jodit_inline).jodit_disabled .jodit-workplace{opacity:.4}.jodit_disabled,.jodit_lock{user-select:none!important}.jodit_hidden{display:none!important}.jodit_vertical_middle{align-items:center;display:flex}.jodit-box{background:0 0;border:0;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;width:auto}.jodit-dialog_theme_dark,.jodit_theme_dark{--jd-color-border:#6b6b6b;--jd-color-text:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-toolbar-collection_mode_horizontal,.jodit-dialog_theme_dark .jodit-toolbar-editor-collection_mode_horizontal,.jodit_theme_dark .jodit-toolbar-collection_mode_horizontal,.jodit_theme_dark .jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(var(--jd-button-size) - 1px),var(--jd-color-border) var(--jd-button-size))}.jodit-dialog_theme_dark .jodit-toolbar-collection_mode_horizontal:after,.jodit-dialog_theme_dark .jodit-toolbar-editor-collection_mode_horizontal:after,.jodit_theme_dark .jodit-toolbar-collection_mode_horizontal:after,.jodit_theme_dark .jodit-toolbar-editor-collection_mode_horizontal:after{background-color:var(--jd-color-border)}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty),.jodit_theme_dark .jodit-toolbar__box:not(:empty){border-color:var(--jd-color-border)}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after,.jodit_theme_dark .jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{background-color:var(--jd-color-border)}.jodit-dialog_theme_dark .jodit-ui-group_separated_true:not(:last-child,.jodit-ui-group_before-spacer_true):after,.jodit_theme_dark .jodit-ui-group_separated_true:not(:last-child,.jodit-ui-group_before-spacer_true):after{border-right-color:var(--jd-color-border)}.jodit-dialog_theme_dark.jodit-container,.jodit_theme_dark.jodit-container{background-color:var(--jd-dark-background-color);border-color:var(--jd-color-border)}.jodit-dialog_theme_dark.jodit-container.jodit_disabled,.jodit_theme_dark.jodit-container.jodit_disabled{background-color:var(--jd-dark-background-color)}.jodit-dialog_theme_dark.jodit-container:not(.jodit_inline) .jodit-workplace,.jodit_theme_dark.jodit-container:not(.jodit_inline) .jodit-workplace{border-color:var(--jd-dark-background-color)}.jodit-dialog_theme_dark .jodit-popup__content,.jodit_theme_dark .jodit-popup__content{background:var(--jd-dark-background-color)}.jodit-dialog_theme_dark .jodit-toolbar-button,.jodit-dialog_theme_dark .jodit-toolbar-select,.jodit-dialog_theme_dark .jodit-ui-button,.jodit_theme_dark .jodit-toolbar-button,.jodit_theme_dark .jodit-toolbar-select,.jodit_theme_dark .jodit-ui-button{--jd-color-icon:var(--jd-dark-icon-color)}.jodit-dialog_theme_dark .jodit-toolbar-button__text,.jodit-dialog_theme_dark .jodit-toolbar-select__text,.jodit-dialog_theme_dark .jodit-ui-button__text,.jodit_theme_dark .jodit-toolbar-button__text,.jodit_theme_dark .jodit-toolbar-select__text,.jodit_theme_dark .jodit-ui-button__text{color:var(--jd-color-text)}.jodit-dialog_theme_dark .jodit-toolbar-button .jodit-icon,.jodit-dialog_theme_dark .jodit-toolbar-button svg,.jodit-dialog_theme_dark .jodit-toolbar-button__trigger,.jodit-dialog_theme_dark .jodit-toolbar-select .jodit-icon,.jodit-dialog_theme_dark .jodit-toolbar-select svg,.jodit-dialog_theme_dark .jodit-toolbar-select__trigger,.jodit-dialog_theme_dark .jodit-ui-button .jodit-icon,.jodit-dialog_theme_dark .jodit-ui-button svg,.jodit-dialog_theme_dark .jodit-ui-button__trigger,.jodit_theme_dark .jodit-toolbar-button .jodit-icon,.jodit_theme_dark .jodit-toolbar-button svg,.jodit_theme_dark .jodit-toolbar-button__trigger,.jodit_theme_dark .jodit-toolbar-select .jodit-icon,.jodit_theme_dark .jodit-toolbar-select svg,.jodit_theme_dark .jodit-toolbar-select__trigger,.jodit_theme_dark .jodit-ui-button .jodit-icon,.jodit_theme_dark .jodit-ui-button svg,.jodit_theme_dark .jodit-ui-button__trigger{fill:var(--jd-color-icon);stroke:var(--jd-color-icon)}.jodit-dialog_theme_dark .jodit-toolbar-button:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-button__button:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-button__text:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-select:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-select__button:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-select__text:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-ui-button:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-ui-button__button:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-ui-button__text:hover:not([disabled]),.jodit-dialog_theme_dark .jodit-ui-button__trigger:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-button:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-button__button:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-button__text:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-select:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-select__button:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-select__text:hover:not([disabled]),.jodit_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]),.jodit_theme_dark .jodit-ui-button:hover:not([disabled]),.jodit_theme_dark .jodit-ui-button__button:hover:not([disabled]),.jodit_theme_dark .jodit-ui-button__text:hover:not([disabled]),.jodit_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){--jd-color-text:var(--jd-dark-background-color);--jd-color-icon:var(--jd-dark-background-color);background-color:var(--jd-dark-background-ligher);color:var(--jd-dark-background-color)}.jodit-dialog_theme_dark .jodit-status-bar,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty),.jodit_theme_dark .jodit-status-bar,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty){background-color:var(--jd-dark-toolbar-color);border-color:var(--jd-color-border);color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-status-bar,.jodit-dialog_theme_dark .jodit-status-bar .jodit-status-bar__item a,.jodit-dialog_theme_dark .jodit-status-bar .jodit-status-bar__item span,.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link,.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link:hover,.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link:visited,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty),.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item a,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item span,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:hover,.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:visited,.jodit_theme_dark .jodit-status-bar,.jodit_theme_dark .jodit-status-bar .jodit-status-bar__item a,.jodit_theme_dark .jodit-status-bar .jodit-status-bar__item span,.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link,.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link:hover,.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link:visited,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty),.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item a,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item span,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:hover,.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:visited{color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty),.jodit_theme_dark .jodit-toolbar__box:not(:empty){background:var(--jd-dark-toolbar-color)}.jodit-dialog_theme_dark .jodit-icon-close,.jodit_theme_dark .jodit-icon-close{stroke:var(--jd-dark-icon-color)}.jodit-dialog_theme_dark .jodit-wysiwyg,.jodit-dialog_theme_dark .jodit-wysiwyg_iframe,.jodit_theme_dark .jodit-wysiwyg,.jodit_theme_dark .jodit-wysiwyg_iframe{background-color:var(--jd-dark-background-color);color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-form input[type=text],.jodit-dialog_theme_dark .jodit-form input[type=url],.jodit-dialog_theme_dark .jodit-form textarea,.jodit_theme_dark .jodit-form input[type=text],.jodit_theme_dark .jodit-form input[type=url],.jodit_theme_dark .jodit-form textarea{background-color:var(--jd-dark-toolbar-seperator-color1);border-color:var(--jd-dark-toolbar-seperator-color2);color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-form button,.jodit_theme_dark .jodit-form button{background-color:var(--jd-dark-toolbar-seperator-color3);color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-placeholder,.jodit_theme_dark .jodit-placeholder{color:var(--jd-dark-text-color-opacity80)}.jodit-dialog_theme_dark .jodit-drag-and-drop__file-box,.jodit-dialog_theme_dark .jodit_uploadfile_button,.jodit_theme_dark .jodit-drag-and-drop__file-box,.jodit_theme_dark .jodit_uploadfile_button{color:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-drag-and-drop__file-box:hover,.jodit-dialog_theme_dark .jodit_uploadfile_button:hover,.jodit_theme_dark .jodit-drag-and-drop__file-box:hover,.jodit_theme_dark .jodit_uploadfile_button:hover{background-color:var(--jd-dark-toolbar-seperator-color3)}.jodit-dialog_theme_dark .jodit-add-new-line:before,.jodit_theme_dark .jodit-add-new-line:before{border-top-color:var(--jd-dark-toolbar-seperator-color2)}.jodit-dialog_theme_dark .jodit-add-new-line span,.jodit_theme_dark .jodit-add-new-line span{background:var(--jd-dark-toolbar-seperator-color3);border-color:var(--jd-dark-toolbar-seperator-color2)}.jodit-dialog_theme_dark .jodit-add-new-line span svg,.jodit_theme_dark .jodit-add-new-line span svg{fill:var(--jd-dark-text-color)}.jodit-dialog_theme_dark .jodit-resizer>i,.jodit_theme_dark .jodit-resizer>i{background:var(--jd-dark-toolbar-seperator-color3);border-color:var(--jd-dark-icon-color)}.jodit-dialog_theme_dark .jodit-input,.jodit-dialog_theme_dark .jodit-select,.jodit_theme_dark .jodit-input,.jodit_theme_dark .jodit-select{background-color:var(--jd-dark-background-ligher);border-color:var(--jd-dark-border-color);color:var(--jd-dark-border-color)}.jodit-dialog_theme_dark.jodit-dialog,.jodit_theme_dark.jodit-dialog{background-color:var(--jd-dark-background-color)}.jodit-dialog_theme_dark.jodit-dialog .jodit-dialog__header,.jodit-dialog_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item,.jodit_theme_dark.jodit-dialog .jodit-dialog__header,.jodit_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item{border-color:var(--jd-dark-border-color)}.jodit-dialog_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item-info,.jodit_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item-info{background-color:var(--jd-dark-text-color)}</style><style type="text/css" data-vite-dev-id="/Users/akshanshupal/Projects/Frontend/travel-next-react/tripzipper-vite/node_modules/lightgallery/css/lightgallery.css">@font-face {
  font-family: "lg";
  src: url("/node_modules/lightgallery/fonts/lg.woff2?io9a6k") format("woff2"), url("/node_modules/lightgallery/fonts/lg.ttf?io9a6k") format("truetype"), url("/node_modules/lightgallery/fonts/lg.woff?io9a6k") format("woff"), url("/node_modules/lightgallery/fonts/lg.svg?io9a6k#lg") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
.lg-icon {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "lg" !important;
  speak: never;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.lg-container {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.lg-next,
.lg-prev {
  background-color: rgba(0, 0, 0, 0.45);
  border-radius: 2px;
  color: #999;
  cursor: pointer;
  display: block;
  font-size: 22px;
  margin-top: -10px;
  padding: 8px 10px 9px;
  position: absolute;
  top: 50%;
  z-index: 1084;
  outline: none;
  border: none;
}
.lg-next.disabled,
.lg-prev.disabled {
  opacity: 0 !important;
  cursor: default;
}
.lg-next:hover:not(.disabled),
.lg-prev:hover:not(.disabled) {
  color: #fff;
}
.lg-single-item .lg-next,
.lg-single-item .lg-prev {
  display: none;
}

.lg-next {
  right: 20px;
}
.lg-next:before {
  content: "\e095";
}

.lg-prev {
  left: 20px;
}
.lg-prev:after {
  content: "\e094";
}

@-webkit-keyframes lg-right-end {
  0% {
    left: 0;
  }
  50% {
    left: -30px;
  }
  100% {
    left: 0;
  }
}
@-moz-keyframes lg-right-end {
  0% {
    left: 0;
  }
  50% {
    left: -30px;
  }
  100% {
    left: 0;
  }
}
@-ms-keyframes lg-right-end {
  0% {
    left: 0;
  }
  50% {
    left: -30px;
  }
  100% {
    left: 0;
  }
}
@keyframes lg-right-end {
  0% {
    left: 0;
  }
  50% {
    left: -30px;
  }
  100% {
    left: 0;
  }
}
@-webkit-keyframes lg-left-end {
  0% {
    left: 0;
  }
  50% {
    left: 30px;
  }
  100% {
    left: 0;
  }
}
@-moz-keyframes lg-left-end {
  0% {
    left: 0;
  }
  50% {
    left: 30px;
  }
  100% {
    left: 0;
  }
}
@-ms-keyframes lg-left-end {
  0% {
    left: 0;
  }
  50% {
    left: 30px;
  }
  100% {
    left: 0;
  }
}
@keyframes lg-left-end {
  0% {
    left: 0;
  }
  50% {
    left: 30px;
  }
  100% {
    left: 0;
  }
}
.lg-outer.lg-right-end .lg-object {
  -webkit-animation: lg-right-end 0.3s;
  -o-animation: lg-right-end 0.3s;
  animation: lg-right-end 0.3s;
  position: relative;
}
.lg-outer.lg-left-end .lg-object {
  -webkit-animation: lg-left-end 0.3s;
  -o-animation: lg-left-end 0.3s;
  animation: lg-left-end 0.3s;
  position: relative;
}

.lg-toolbar {
  z-index: 1082;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.lg-media-overlap .lg-toolbar {
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.4));
}
.lg-toolbar .lg-icon {
  color: #999;
  cursor: pointer;
  float: right;
  font-size: 24px;
  height: 47px;
  line-height: 27px;
  padding: 10px 0;
  text-align: center;
  width: 50px;
  text-decoration: none !important;
  outline: medium none;
  will-change: color;
  -webkit-transition: color 0.2s linear;
  -o-transition: color 0.2s linear;
  transition: color 0.2s linear;
  background: none;
  border: none;
  box-shadow: none;
}
.lg-toolbar .lg-icon.lg-icon-18 {
  font-size: 18px;
}
.lg-toolbar .lg-icon:hover {
  color: #fff;
}
.lg-toolbar .lg-close:after {
  content: "\e070";
}
.lg-toolbar .lg-maximize {
  font-size: 22px;
}
.lg-toolbar .lg-maximize:after {
  content: "\e90a";
}
.lg-toolbar .lg-download:after {
  content: "\e0f2";
}

.lg-sub-html {
  color: #eee;
  font-size: 16px;
  padding: 10px 40px;
  text-align: center;
  z-index: 1080;
  opacity: 0;
  -webkit-transition: opacity 0.2s ease-out 0s;
  -o-transition: opacity 0.2s ease-out 0s;
  transition: opacity 0.2s ease-out 0s;
}
.lg-sub-html h4 {
  margin: 0;
  font-size: 13px;
  font-weight: bold;
}
.lg-sub-html p {
  font-size: 12px;
  margin: 5px 0 0;
}
.lg-sub-html a {
  color: inherit;
}
.lg-sub-html a:hover {
  text-decoration: underline;
}
.lg-media-overlap .lg-sub-html {
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
}
.lg-item .lg-sub-html {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

.lg-error-msg {
  font-size: 14px;
  color: #999;
}

.lg-counter {
  color: #999;
  display: inline-block;
  font-size: 16px;
  padding-left: 20px;
  padding-top: 12px;
  height: 47px;
  vertical-align: middle;
}

.lg-closing .lg-toolbar,
.lg-closing .lg-prev,
.lg-closing .lg-next,
.lg-closing .lg-sub-html {
  opacity: 0;
  -webkit-transition: -webkit-transform 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, color 0.08 linear;
  -moz-transition: -moz-transform 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, color 0.08 linear;
  -o-transition: -o-transform 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, color 0.08 linear;
  transition: transform 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.08 cubic-bezier(0, 0, 0.25, 1) 0s, color 0.08 linear;
}

body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable) .lg-img-wrap,
body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable) .lg-video-cont,
body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable) .lg-media-cont {
  opacity: 0;
  -moz-transform: scale3d(0.5, 0.5, 0.5);
  -o-transform: scale3d(0.5, 0.5, 0.5);
  -ms-transform: scale3d(0.5, 0.5, 0.5);
  -webkit-transform: scale3d(0.5, 0.5, 0.5);
  transform: scale3d(0.5, 0.5, 0.5);
  will-change: transform, opacity;
  -webkit-transition: -webkit-transform 250ms cubic-bezier(0, 0, 0.25, 1) 0s, opacity 250ms cubic-bezier(0, 0, 0.25, 1) !important;
  -moz-transition: -moz-transform 250ms cubic-bezier(0, 0, 0.25, 1) 0s, opacity 250ms cubic-bezier(0, 0, 0.25, 1) !important;
  -o-transition: -o-transform 250ms cubic-bezier(0, 0, 0.25, 1) 0s, opacity 250ms cubic-bezier(0, 0, 0.25, 1) !important;
  transition: transform 250ms cubic-bezier(0, 0, 0.25, 1) 0s, opacity 250ms cubic-bezier(0, 0, 0.25, 1) !important;
}
body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable).lg-complete .lg-img-wrap,
body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable).lg-complete .lg-video-cont,
body:not(.lg-from-hash) .lg-outer.lg-start-zoom .lg-item:not(.lg-zoomable).lg-complete .lg-media-cont {
  opacity: 1;
  -moz-transform: scale3d(1, 1, 1);
  -o-transform: scale3d(1, 1, 1);
  -ms-transform: scale3d(1, 1, 1);
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
}

.lg-icon:focus-visible {
  color: #fff;
  border-radius: 3px;
  outline: 1px dashed rgba(255, 255, 255, 0.6);
}

.lg-toolbar .lg-icon:focus-visible {
  border-radius: 8px;
  outline-offset: -5px;
}

.lg-group:after {
  content: "";
  display: table;
  clear: both;
}

.lg-container {
  display: none;
  outline: none;
}
.lg-container.lg-show {
  display: block;
}

.lg-on {
  scroll-behavior: unset;
}

.lg-overlay-open {
  overflow: hidden;
}

.lg-toolbar,
.lg-prev,
.lg-next,
.lg-pager-outer,
.lg-hide-sub-html .lg-sub-html {
  opacity: 0;
  will-change: transform, opacity;
  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.25s cubic-bezier(0, 0, 0.25, 1) 0s;
  -moz-transition: -moz-transform 0.25s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.25s cubic-bezier(0, 0, 0.25, 1) 0s;
  -o-transition: -o-transform 0.25s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.25s cubic-bezier(0, 0, 0.25, 1) 0s;
  transition: transform 0.25s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.25s cubic-bezier(0, 0, 0.25, 1) 0s;
}

.lg-show-in .lg-toolbar,
.lg-show-in .lg-prev,
.lg-show-in .lg-next,
.lg-show-in .lg-pager-outer {
  opacity: 1;
}
.lg-show-in.lg-hide-sub-html .lg-sub-html {
  opacity: 1;
}
.lg-show-in .lg-hide-items .lg-prev {
  opacity: 0;
  -webkit-transform: translate3d(-10px, 0, 0);
  transform: translate3d(-10px, 0, 0);
}
.lg-show-in .lg-hide-items .lg-next {
  opacity: 0;
  -webkit-transform: translate3d(10px, 0, 0);
  transform: translate3d(10px, 0, 0);
}
.lg-show-in .lg-hide-items .lg-toolbar {
  opacity: 0;
  -webkit-transform: translate3d(0, -10px, 0);
  transform: translate3d(0, -10px, 0);
}
.lg-show-in .lg-hide-items.lg-hide-sub-html .lg-sub-html {
  opacity: 0;
  -webkit-transform: translate3d(0, 20px, 0);
  transform: translate3d(0, 20px, 0);
}

.lg-outer {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  text-align: left;
  opacity: 0.001;
  outline: none;
  will-change: auto;
  overflow: hidden;
  -webkit-transition: opacity 0.15s ease 0s;
  -o-transition: opacity 0.15s ease 0s;
  transition: opacity 0.15s ease 0s;
}
.lg-outer * {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.lg-outer.lg-zoom-from-image {
  opacity: 1;
}
.lg-outer.lg-visible {
  opacity: 1;
}
.lg-outer.lg-css3 .lg-item:not(.lg-start-end-progress).lg-prev-slide, .lg-outer.lg-css3 .lg-item:not(.lg-start-end-progress).lg-next-slide, .lg-outer.lg-css3 .lg-item:not(.lg-start-end-progress).lg-current {
  -webkit-transition-duration: inherit !important;
  transition-duration: inherit !important;
  -webkit-transition-timing-function: inherit !important;
  transition-timing-function: inherit !important;
}
.lg-outer.lg-css3.lg-dragging .lg-item.lg-prev-slide, .lg-outer.lg-css3.lg-dragging .lg-item.lg-next-slide, .lg-outer.lg-css3.lg-dragging .lg-item.lg-current {
  -webkit-transition-duration: 0s !important;
  transition-duration: 0s !important;
  opacity: 1;
}
.lg-outer.lg-grab img.lg-object {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: -o-grab;
  cursor: -ms-grab;
  cursor: grab;
}
.lg-outer.lg-grabbing img.lg-object {
  cursor: move;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: -o-grabbing;
  cursor: -ms-grabbing;
  cursor: grabbing;
}
.lg-outer .lg-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.lg-outer .lg-inner {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  -webkit-transition: opacity 0s;
  -o-transition: opacity 0s;
  transition: opacity 0s;
  white-space: nowrap;
}
.lg-outer .lg-item {
  display: none !important;
}
.lg-outer .lg-item:not(.lg-start-end-progress) {
  background: url("/node_modules/lightgallery/images/loading.gif") no-repeat scroll center center transparent;
}
.lg-outer.lg-css3 .lg-prev-slide,
.lg-outer.lg-css3 .lg-current,
.lg-outer.lg-css3 .lg-next-slide {
  display: inline-block !important;
}
.lg-outer.lg-css .lg-current {
  display: inline-block !important;
}
.lg-outer .lg-item,
.lg-outer .lg-img-wrap {
  display: inline-block;
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
}
.lg-outer .lg-item:before,
.lg-outer .lg-img-wrap:before {
  content: "";
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.lg-outer .lg-img-wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  white-space: nowrap;
  font-size: 0;
}
.lg-outer .lg-item.lg-complete {
  background-image: none;
}
.lg-outer .lg-item.lg-current {
  z-index: 1060;
}
.lg-outer .lg-object {
  display: inline-block;
  vertical-align: middle;
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  position: relative;
}
.lg-outer .lg-empty-html.lg-sub-html,
.lg-outer .lg-empty-html .lg-sub-html {
  display: none;
}
.lg-outer.lg-hide-download .lg-download {
  opacity: 0.75;
  pointer-events: none;
}
.lg-outer .lg-first-slide .lg-dummy-img {
  position: absolute;
  top: 50%;
  left: 50%;
}
.lg-outer.lg-components-open:not(.lg-zoomed) .lg-components {
  -webkit-transform: translate3d(0, 0%, 0);
  transform: translate3d(0, 0%, 0);
  opacity: 1;
}
.lg-outer.lg-components-open:not(.lg-zoomed) .lg-sub-html {
  opacity: 1;
  transition: opacity 0.2s ease-out 0.15s;
}
.lg-outer .lg-media-cont {
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  position: relative;
}
.lg-outer .lg-media-cont .lg-object {
  width: 100% !important;
  height: 100% !important;
}
.lg-outer .lg-has-iframe .lg-media-cont {
  -webkit-overflow-scrolling: touch;
  overflow: auto;
}

.lg-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1040;
  background-color: #000;
  opacity: 0;
  will-change: auto;
  -webkit-transition: opacity 333ms ease-in 0s;
  -o-transition: opacity 333ms ease-in 0s;
  transition: opacity 333ms ease-in 0s;
}
.lg-backdrop.in {
  opacity: 1;
}

.lg-css3.lg-no-trans .lg-prev-slide,
.lg-css3.lg-no-trans .lg-next-slide,
.lg-css3.lg-no-trans .lg-current {
  -webkit-transition: none 0s ease 0s !important;
  -moz-transition: none 0s ease 0s !important;
  -o-transition: none 0s ease 0s !important;
  transition: none 0s ease 0s !important;
}
.lg-css3.lg-use-css3 .lg-item {
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}
.lg-css3.lg-fade .lg-item {
  opacity: 0;
}
.lg-css3.lg-fade .lg-item.lg-current {
  opacity: 1;
}
.lg-css3.lg-fade .lg-item.lg-prev-slide, .lg-css3.lg-fade .lg-item.lg-next-slide, .lg-css3.lg-fade .lg-item.lg-current {
  -webkit-transition: opacity 0.1s ease 0s;
  -moz-transition: opacity 0.1s ease 0s;
  -o-transition: opacity 0.1s ease 0s;
  transition: opacity 0.1s ease 0s;
}
.lg-css3.lg-use-css3 .lg-item.lg-start-progress {
  -webkit-transition: -webkit-transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  -moz-transition: -moz-transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  -o-transition: -o-transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
  transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s;
}
.lg-css3.lg-use-css3 .lg-item.lg-start-end-progress {
  -webkit-transition: -webkit-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s;
  -moz-transition: -moz-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s;
  -o-transition: -o-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s;
  transition: transform 1s cubic-bezier(0, 0, 0.25, 1) 0s;
}
.lg-css3.lg-slide.lg-use-css3 .lg-item {
  opacity: 0;
}
.lg-css3.lg-slide.lg-use-css3 .lg-item.lg-prev-slide {
  -webkit-transform: translate3d(-100%, 0, 0);
  transform: translate3d(-100%, 0, 0);
}
.lg-css3.lg-slide.lg-use-css3 .lg-item.lg-next-slide {
  -webkit-transform: translate3d(100%, 0, 0);
  transform: translate3d(100%, 0, 0);
}
.lg-css3.lg-slide.lg-use-css3 .lg-item.lg-current {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
.lg-css3.lg-slide.lg-use-css3 .lg-item.lg-prev-slide, .lg-css3.lg-slide.lg-use-css3 .lg-item.lg-next-slide, .lg-css3.lg-slide.lg-use-css3 .lg-item.lg-current {
  -webkit-transition: -webkit-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.1s ease 0s;
  -moz-transition: -moz-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.1s ease 0s;
  -o-transition: -o-transform 1s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.1s ease 0s;
  transition: transform 1s cubic-bezier(0, 0, 0.25, 1) 0s, opacity 0.1s ease 0s;
}

.lg-container {
  display: none;
}
.lg-container.lg-show {
  display: block;
}
.lg-container.lg-dragging-vertical .lg-backdrop {
  -webkit-transition-duration: 0s !important;
  transition-duration: 0s !important;
}
.lg-container.lg-dragging-vertical .lg-css3 .lg-item.lg-current {
  -webkit-transition-duration: 0s !important;
  transition-duration: 0s !important;
  opacity: 1;
}

.lg-inline .lg-backdrop,
.lg-inline .lg-outer {
  position: absolute;
}
.lg-inline .lg-backdrop {
  z-index: 1;
}
.lg-inline .lg-outer {
  z-index: 2;
}
.lg-inline .lg-maximize:after {
  content: "\e909";
}

.lg-components {
  -webkit-transform: translate3d(0, 100%, 0);
  transform: translate3d(0, 100%, 0);
  will-change: transform;
  -webkit-transition: -webkit-transform 0.35s ease-out 0s;
  -moz-transition: -moz-transform 0.35s ease-out 0s;
  -o-transition: -o-transform 0.35s ease-out 0s;
  transition: transform 0.35s ease-out 0s;
  z-index: 1080;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
}

                                            
</style><style type="text/css" data-vite-dev-id="/Users/akshanshupal/Projects/Frontend/travel-next-react/tripzipper-vite/node_modules/lightgallery/css/lg-thumbnail.css">.lg-outer .lg-thumb-outer {
  background-color: #0d0a0a;
  width: 100%;
  max-height: 350px;
  overflow: hidden;
  float: left;
}
.lg-outer .lg-thumb-outer.lg-grab .lg-thumb-item {
  cursor: -webkit-grab;
  cursor: -moz-grab;
  cursor: -o-grab;
  cursor: -ms-grab;
  cursor: grab;
}
.lg-outer .lg-thumb-outer.lg-grabbing .lg-thumb-item {
  cursor: move;
  cursor: -webkit-grabbing;
  cursor: -moz-grabbing;
  cursor: -o-grabbing;
  cursor: -ms-grabbing;
  cursor: grabbing;
}
.lg-outer .lg-thumb-outer.lg-dragging .lg-thumb {
  -webkit-transition-duration: 0s !important;
  transition-duration: 0s !important;
}
.lg-outer .lg-thumb-outer.lg-rebuilding-thumbnails .lg-thumb {
  -webkit-transition-duration: 0s !important;
  transition-duration: 0s !important;
}
.lg-outer .lg-thumb-outer.lg-thumb-align-middle {
  text-align: center;
}
.lg-outer .lg-thumb-outer.lg-thumb-align-left {
  text-align: left;
}
.lg-outer .lg-thumb-outer.lg-thumb-align-right {
  text-align: right;
}
.lg-outer.lg-single-item .lg-thumb-outer {
  display: none;
}
.lg-outer .lg-thumb {
  padding: 5px 0;
  height: 100%;
  margin-bottom: -5px;
  display: inline-block;
  vertical-align: middle;
}
@media (min-width: 768px) {
  .lg-outer .lg-thumb {
    padding: 10px 0;
  }
}
.lg-outer .lg-thumb-item {
  cursor: pointer;
  float: left;
  overflow: hidden;
  height: 100%;
  border-radius: 2px;
  margin-bottom: 5px;
  will-change: border-color;
}
@media (min-width: 768px) {
  .lg-outer .lg-thumb-item {
    border-radius: 4px;
    border: 2px solid #fff;
    -webkit-transition: border-color 0.25s ease;
    -o-transition: border-color 0.25s ease;
    transition: border-color 0.25s ease;
  }
}
.lg-outer .lg-thumb-item.active, .lg-outer .lg-thumb-item:hover {
  border-color: rgb(169, 7, 7);
}
.lg-outer .lg-thumb-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.lg-outer.lg-can-toggle .lg-item {
  padding-bottom: 0;
}
.lg-outer .lg-toggle-thumb:after {
  content: "\e1ff";
}
.lg-outer.lg-animate-thumb .lg-thumb {
  -webkit-transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
}

                                            
</style><style type="text/css" data-vite-dev-id="/Users/akshanshupal/Projects/Frontend/travel-next-react/tripzipper-vite/node_modules/lightgallery/css/lg-zoom.css">.lg-outer.lg-css3.lg-zoom-dragging .lg-item.lg-complete.lg-zoomable .lg-img-wrap,
.lg-outer.lg-css3.lg-zoom-dragging .lg-item.lg-complete.lg-zoomable .lg-image {
  -webkit-transition-duration: 0ms !important;
  transition-duration: 0ms !important;
}
.lg-outer.lg-use-transition-for-zoom .lg-item.lg-complete.lg-zoomable .lg-img-wrap {
  will-change: transform;
  -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s;
  -moz-transition: -moz-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s;
  -o-transition: -o-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s;
  transition: transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s;
}
.lg-outer.lg-use-transition-for-zoom.lg-zoom-drag-transition .lg-item.lg-complete.lg-zoomable .lg-img-wrap {
  will-change: transform;
  -webkit-transition: -webkit-transform 0.8s cubic-bezier(0, 0, 0.25, 1) 0s;
  -moz-transition: -moz-transform 0.8s cubic-bezier(0, 0, 0.25, 1) 0s;
  -o-transition: -o-transform 0.8s cubic-bezier(0, 0, 0.25, 1) 0s;
  transition: transform 0.8s cubic-bezier(0, 0, 0.25, 1) 0s;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-img-wrap {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-image,
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-dummy-img {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  -webkit-transition: -webkit-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s, opacity 0.15s !important;
  -moz-transition: -moz-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s, opacity 0.15s !important;
  -o-transition: -o-transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s, opacity 0.15s !important;
  transition: transform 0.5s cubic-bezier(0.12, 0.415, 0.01, 1.19) 0s, opacity 0.15s !important;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  backface-visibility: hidden;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-image.no-transition,
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-dummy-img.no-transition {
  transition: none !important;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-image.reset-transition,
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-dummy-img.reset-transition {
  transform: scale3d(1, 1, 1) translate3d(-50%, -50%, 0px) !important;
  max-width: none !important;
  max-height: none !important;
  top: 50% !important;
  left: 50% !important;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-image.reset-transition-x,
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-dummy-img.reset-transition-x {
  transform: scale3d(1, 1, 1) translate3d(-50%, 0, 0px) !important;
  top: 0 !important;
  left: 50% !important;
  max-width: none !important;
  max-height: none !important;
}
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-image.reset-transition-y,
.lg-outer .lg-item.lg-complete.lg-zoomable .lg-dummy-img.reset-transition-y {
  transform: scale3d(1, 1, 1) translate3d(0, -50%, 0px) !important;
  top: 50% !important;
  left: 0% !important;
  max-width: none !important;
  max-height: none !important;
}

.lg-icon.lg-zoom-in:after {
  content: "\e311";
}
.lg-actual-size .lg-icon.lg-zoom-in {
  opacity: 1;
  pointer-events: auto;
}
.lg-icon.lg-actual-size {
  font-size: 20px;
}
.lg-icon.lg-actual-size:after {
  content: "\e033";
}
.lg-icon.lg-zoom-out {
  opacity: 0.5;
  pointer-events: none;
}
.lg-icon.lg-zoom-out:after {
  content: "\e312";
}
.lg-zoomed .lg-icon.lg-zoom-out {
  opacity: 1;
  pointer-events: auto;
}

.lg-outer[data-lg-slide-type=video] .lg-zoom-in,
.lg-outer[data-lg-slide-type=video] .lg-actual-size,
.lg-outer[data-lg-slide-type=video] .lg-zoom-out, .lg-outer[data-lg-slide-type=iframe] .lg-zoom-in,
.lg-outer[data-lg-slide-type=iframe] .lg-actual-size,
.lg-outer[data-lg-slide-type=iframe] .lg-zoom-out, .lg-outer.lg-first-slide-loading .lg-zoom-in,
.lg-outer.lg-first-slide-loading .lg-actual-size,
.lg-outer.lg-first-slide-loading .lg-zoom-out {
  opacity: 0.75;
  pointer-events: none;
}

                                       
</style><style>/*!
 * jodit - Jodit is an awesome and useful wysiwyg editor with filebrowser
 * Author: Chupurnov <chupurnov@gmail.com> (https://xdsoft.net/jodit/)
 * Version: v4.2.10
 * Url: https://xdsoft.net/jodit/
 * License(s): MIT
 */
	/*!
 * jodit - Jodit is an awesome and useful wysiwyg editor with filebrowser
 * Author: Chupurnov <chupurnov@gmail.com> (https://xdsoft.net/jodit/)
 * Version: v4.2.10
 * Url: https://xdsoft.net/jodit/
 * License(s): MIT
 */
	.jodit-about{padding:20px}.jodit-about a{color:#459ce7;text-decoration:none}.jodit-about a:focus,.jodit-about a:hover{color:#23527c;outline:0;text-decoration:underline}.jodit-about div{margin-bottom:calc(8px/2)}.jodit-ui-group{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-negative:0;flex-shrink:0;-ms-flex-wrap:wrap;flex-wrap:wrap;max-width:100%}.jodit-ui-group_line_true{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch}.jodit-ui-group_separated_true:not(:last-child):not(.jodit-ui-group_before-spacer_true):after{border-left:0;border-right:1px solid #dadada;content:"";cursor:default;margin:2px;padding:0}.jodit-ui-group:last-child{border-bottom:0}.jodit-ui-list{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.jodit-ui-list_mode_vertical .jodit-ui-group{background-color:transparent;border:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.jodit-ui-list_mode_vertical .jodit-toolbar-button{height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2)}.jodit-ui-list_mode_vertical .jodit-toolbar-button__button{cursor:pointer;height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2);width:100%}.jodit-ui-list_mode_vertical .jodit-toolbar-button__text:not(:empty){-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left}.jodit-ui-separator{border-left:0;border-right:1px solid #dadada;cursor:default;margin:2px;padding:0}.jodit-ui-break{border-top:1px solid #dadada;-ms-flex-preferred-size:100%;flex-basis:100%;height:0!important;width:0}.jodit-ui-spacer{-webkit-box-flex:1;-ms-flex:1;flex:1}.jodit-ui-button-icon-text__icon{display:none}.jodit-ui-button-icon-text__icon:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.jodit-ui-button-icon-text__text{display:none}.jodit-ui-button-icon-text__text:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-ui-button-icon-text_context_menu .jodit-ui-button-icon-text__text{-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;padding-left:8px;position:relative}.jodit-ui-button-icon-text_context_menu .jodit-ui-button-icon-text__text:before{border-left:1px solid #dadada;content:"";height:35px;left:0;position:absolute;top:calc(8px*-1)}.jodit-ui-button-icon-text__icon:not(:empty)+.jodit-ui-button-icon-text__text:not(:empty){margin-left:8px}.jodit-ui-button-icon-text__icon:empty+.jodit-ui-button-icon-text__text:not(:empty){padding:0 8px}.jodit-ui-button-clear,.jodit-ui-button_clear{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:0;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;font-style:normal;outline:0;padding:0;position:relative;text-align:center;text-decoration:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-ui-button-sizes{height:34px;min-width:34px}.jodit-ui-button-sizes .jodit-icon{height:14px;width:14px}.jodit-ui-button-sizes button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:34px;min-width:34px;padding:0}.jodit-ui-button-sizes_text-icons_true button{padding:0 8px}.jodit-ui-button-sizes_size_tiny{height:16px;min-width:16px}.jodit-ui-button-sizes_size_tiny .jodit-icon{height:8px;width:8px}.jodit-ui-button-sizes_size_tiny button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:16px;min-width:16px;padding:0}.jodit-ui-button-sizes_size_tiny_text-icons_true button{padding:0 8px}.jodit-ui-button-sizes_size_xsmall{height:22px;min-width:22px}.jodit-ui-button-sizes_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-ui-button-sizes_size_xsmall button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:22px;min-width:22px;padding:0}.jodit-ui-button-sizes_size_xsmall_text-icons_true button{padding:0 8px}.jodit-ui-button-sizes_size_small{height:28px;min-width:28px}.jodit-ui-button-sizes_size_small .jodit-icon{height:12px;width:12px}.jodit-ui-button-sizes_size_small button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;min-width:28px;padding:0}.jodit-ui-button-sizes_size_small_text-icons_true button{padding:0 8px}.jodit-ui-button-sizes_size_large{height:40px;min-width:40px}.jodit-ui-button-sizes_size_large .jodit-icon{height:16px;width:16px}.jodit-ui-button-sizes_size_large button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:40px;min-width:40px;padding:0}.jodit-ui-button-sizes_size_large_text-icons_true button{padding:0 8px}.jodit-ui-button-variants_variant_outline{border:1px solid #dadada}.jodit-ui-button-variants_variant_default{background-color:#e3e3e3;color:#212529}.jodit-ui-button-variants_variant_default svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default [disabled]{opacity:.7}.jodit-ui-button-variants_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button-variants_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button-variants_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button-variants_variant_primary{background-color:#007bff;color:#fff}.jodit-ui-button-variants_variant_primary svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary [disabled]{opacity:.7}.jodit-ui-button-variants_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-ui-button-variants_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-ui-button-variants_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-ui-button-variants_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-ui-button-variants_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary [disabled]{opacity:.7}.jodit-ui-button-variants_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button-variants_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button-variants_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button-variants_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button-variants_variant_success{background-color:#28a745;color:#fff}.jodit-ui-button-variants_variant_success svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success [disabled]{opacity:.7}.jodit-ui-button-variants_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-ui-button-variants_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-ui-button-variants_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-ui-button-variants_variant_danger{background-color:#dc3545;color:#fff}.jodit-ui-button-variants_variant_danger svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger [disabled]{opacity:.7}.jodit-ui-button-variants_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-ui-button-variants_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-ui-button-variants_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button-variants_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-ui-button-style{border-radius:3px;padding:0 8px}.jodit-ui-button{-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:rgba(0,0,0,.75);display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-ui-button-style{-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:rgba(0,0,0,.75);display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-ui-button{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:0;border-radius:3px;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:pointer;font-style:normal;height:34px;min-width:34px;outline:0;padding:0;padding:0 8px;position:relative;text-align:center;text-decoration:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-ui-button:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-ui-button:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-ui-button:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-ui-button[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-ui-button[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-ui-button[disabled]{opacity:.3;pointer-events:none}.jodit-ui-button .jodit-icon{height:14px;width:14px}.jodit-ui-button button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:34px;min-width:34px;padding:0}.jodit-ui-button_text-icons_true button{padding:0 8px}.jodit-ui-button_size_tiny{height:16px;min-width:16px}.jodit-ui-button_size_tiny .jodit-icon{height:8px;width:8px}.jodit-ui-button_size_tiny button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:16px;min-width:16px;padding:0}.jodit-ui-button_size_tiny_text-icons_true button{padding:0 8px}.jodit-ui-button_size_xsmall{height:22px;min-width:22px}.jodit-ui-button_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-ui-button_size_xsmall button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:22px;min-width:22px;padding:0}.jodit-ui-button_size_xsmall_text-icons_true button{padding:0 8px}.jodit-ui-button_size_small{height:28px;min-width:28px}.jodit-ui-button_size_small .jodit-icon{height:12px;width:12px}.jodit-ui-button_size_small button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;min-width:28px;padding:0}.jodit-ui-button_size_small_text-icons_true button{padding:0 8px}.jodit-ui-button_size_large{height:40px;min-width:40px}.jodit-ui-button_size_large .jodit-icon{height:16px;width:16px}.jodit-ui-button_size_large button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:40px;min-width:40px;padding:0}.jodit-ui-button_size_large_text-icons_true button{padding:0 8px}.jodit-ui-button__icon{display:none}.jodit-ui-button__icon:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.jodit-ui-button__text{display:none}.jodit-ui-button__text:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-ui-button_context_menu .jodit-ui-button__text{-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;padding-left:8px;position:relative}.jodit-ui-button_context_menu .jodit-ui-button__text:before{border-left:1px solid #dadada;content:"";height:35px;left:0;position:absolute;top:calc(8px*-1)}.jodit-ui-button__icon:not(:empty)+.jodit-ui-button__text:not(:empty){margin-left:8px}.jodit-ui-button__icon:empty+.jodit-ui-button__text:not(:empty){padding:0 8px}.jodit-ui-button:focus:not([disabled]){outline:1px dashed #b5d6fd}.jodit-ui-button_variant_outline{border:1px solid #dadada}.jodit-ui-button_variant_default{background-color:#e3e3e3;color:#212529}.jodit-ui-button_variant_default svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default [disabled]{opacity:.7}.jodit-ui-button_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button_variant_primary{background-color:#007bff;color:#fff}.jodit-ui-button_variant_primary svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary [disabled]{opacity:.7}.jodit-ui-button_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-ui-button_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-ui-button_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-ui-button_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-ui-button_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary [disabled]{opacity:.7}.jodit-ui-button_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-ui-button_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-ui-button_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-ui-button_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-ui-button_variant_success{background-color:#28a745;color:#fff}.jodit-ui-button_variant_success svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success [disabled]{opacity:.7}.jodit-ui-button_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-ui-button_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-ui-button_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-ui-button_variant_danger{background-color:#dc3545;color:#fff}.jodit-ui-button_variant_danger svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger [disabled]{opacity:.7}.jodit-ui-button_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-ui-button_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-ui-button_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-ui-button_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-popup{background:0 0;border:0;-webkit-box-shadow:0 4px 1px -2px rgba(76,76,76,.2),0 3px 3px 0 rgba(76,76,76,.15),0 1px 4px 0 rgba(76,76,76,.13);box-shadow:0 4px 1px -2px rgba(76,76,76,.2),0 3px 3px 0 rgba(76,76,76,.15),0 1px 4px 0 rgba(76,76,76,.13);display:inline-block;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);width:auto;z-index:10000001}.jodit-popup__content{background:#fff;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;max-height:300px;overflow:auto;padding:8px;overflow-scrolling:touch}.jodit-popup_padding_false .jodit-popup__content{padding:0}.jodit-popup_max-height_false .jodit-popup__content{max-height:-webkit-fit-content;max-height:-moz-fit-content;max-height:fit-content}.jodit-context-menu{background:0 0;border:0;-webkit-box-shadow:0 4px 1px -2px rgba(76,76,76,.2),0 3px 3px 0 rgba(76,76,76,.15),0 1px 4px 0 rgba(76,76,76,.13);box-shadow:0 4px 1px -2px rgba(76,76,76,.2),0 3px 3px 0 rgba(76,76,76,.15),0 1px 4px 0 rgba(76,76,76,.13);display:inline-block;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;position:fixed;-webkit-transform:translateZ(0);transform:translateZ(0);width:auto;z-index:10000001;z-index:30000005}.jodit-context-menu{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px}.jodit-context-menu__content{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px}.jodit-context-menu__content{background:#fff;max-height:300px;overflow:auto;padding:8px;overflow-scrolling:touch}.jodit-context-menu_padding_false .jodit-context-menu__content{padding:0}.jodit-context-menu_max-height_false .jodit-context-menu__content{max-height:-webkit-fit-content;max-height:-moz-fit-content;max-height:fit-content}.jodit-context-menu .jodit-ui-button{display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-context-menu button{width:100%}.jodit-context-menu_theme_dark{background-color:#575757}.jodit-ui-button-group{margin-bottom:8px}.jodit-ui-button-group__label{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-button-group__options{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start}.jodit-ui-button-group .jodit-ui-button:not(:last-child){border-bottom-right-radius:0;border-top-right-radius:0}.jodit-ui-button-group .jodit-ui-button+.jodit-ui-button{border-bottom-left-radius:0;border-left:1px solid hsla(0,0%,86%,.4);border-top-left-radius:0}.jodit-ui-button-group .jodit-ui-button[aria-pressed=true]:not([disabled]){background-color:#dcdcdc;border-left:0;-webkit-box-shadow:inset 0 0 3px 0 #4c4c4c;box-shadow:inset 0 0 3px 0 #4c4c4c;color:#4c4c4c;outline:0}.jodit-ui-button-group .jodit-ui-button[aria-pressed=true]:not([disabled])+.jodit-ui-button{border:0}.jodit-ui-tooltip{-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;background-clip:padding-box;background-color:rgba(0,0,0,.7);border-radius:4px;-webkit-box-shadow:0 0 0 0 #e5e5e5,0 8px 20px 0 rgba(0,0,0,.15);box-shadow:0 0 0 0 #e5e5e5,0 8px 20px 0 rgba(0,0,0,.15);color:#fff;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:11px;line-height:1.4;max-width:120px;opacity:0;outline:none;position:fixed;text-rendering:optimizelegibility;-webkit-transform:translate(-50%,calc(8px/2));-ms-transform:translate(-50%,calc(8px/2));transform:translate(-50%,calc(8px/2));-webkit-transition:opacity .2s ease 0s;transition:opacity .2s ease 0s;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:normal;width:auto;z-index:30000006}@media (max-width:768px){.jodit-ui-tooltip{display:none}}.jodit-ui-tooltip__content{padding:calc(8px/2) calc(8px*1.5)}.jodit-ui-tooltip.jodit-ui-tooltip_visible_true{opacity:1}.jodit-ui-block{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;margin-bottom:8px}.jodit-ui-block_width_full{width:100%}.jodit-ui-block_align_full{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.jodit-ui-block_align_right{-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.jodit-ui-block_padding_true{padding:8px}.jodit-ui-label{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-input{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-bottom:8px}.jodit-ui-input__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:0;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit-ui-input__input[disabled]{background-color:#f0f0f0;color:#dadada}.jodit-ui-input__input_has-error_true{border-color:#ff3b3b}.jodit-ui-input__input:focus{outline:0}.jodit-ui-input_theme_dark .jodit-ui-input__input{background-color:#dadada}.jodit-ui-input_has-error_true .jodit-ui-input__input{border-color:#ff3b3b}.jodit-ui-input__error{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-input__label{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-input__error{color:#ff3b3b}.jodit-ui-input_has-error_true .jodit-ui-input__label{color:#ff3b3b}.jodit-ui-input__wrapper{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;border:1px solid #dadada;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-input__wrapper{min-width:140px}}.jodit-ui-input_theme_dark .jodit-ui-input__wrapper{background-color:#dadada;border-color:#dadada}.jodit-ui-input_focused_true .jodit-ui-input__wrapper{border-color:#1e88e5}.jodit-ui-input__icon:not(:empty){-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 8px}.jodit-ui-input__icon:not(:empty) svg{height:16px;width:16px;fill:#dadada}.jodit-ui-input__icon:not(:empty)+.jodit-ui-input__input{padding-left:0}.jodit-ui-input__clear{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;opacity:.8;padding:0 8px 0 0}.jodit-ui-input__clear:active{opacity:1;-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.jodit-ui-input__clear svg{height:12px;width:12px;fill:#dadada}.jodit-ui-input_theme_dark .jodit-ui-input__clear svg{fill:#4c4c4c}.jodit-ui-input_theme_dark .jodit-ui-input__icon svg{fill:#4c4c4c}.jodit-ui-block .jodit-ui-input{margin-bottom:0}.jodit-ui-select{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-bottom:8px}.jodit-ui-select__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:0;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit-ui-select__input[disabled]{background-color:#f0f0f0;color:#dadada}.jodit-ui-select__input_has-error_true{border-color:#ff3b3b}.jodit-ui-select__input:focus{outline:0}.jodit-ui-select_theme_dark .jodit-ui-select__input{background-color:#dadada}.jodit-ui-select_has-error_true .jodit-ui-select__input{border-color:#ff3b3b}.jodit-ui-select__error{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-select__label{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-select__error{color:#ff3b3b}.jodit-ui-select_has-error_true .jodit-ui-select__label{color:#ff3b3b}.jodit-ui-select__wrapper{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;border:1px solid #dadada;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-select__wrapper{min-width:140px}}.jodit-ui-select_theme_dark .jodit-ui-select__wrapper{background-color:#dadada;border-color:#dadada}.jodit-ui-select_focused_true .jodit-ui-select__wrapper{border-color:#1e88e5}.jodit-ui-select__icon:not(:empty){-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 8px}.jodit-ui-select__icon:not(:empty) svg{height:16px;width:16px;fill:#dadada}.jodit-ui-select__icon:not(:empty)+.jodit-ui-select__input{padding-left:0}.jodit-ui-select__clear{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;opacity:.8;padding:0 8px 0 0}.jodit-ui-select__clear:active{opacity:1;-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.jodit-ui-select__clear svg{height:12px;width:12px;fill:#dadada}.jodit-ui-select_theme_dark .jodit-ui-select__clear svg{fill:#4c4c4c}.jodit-ui-select_theme_dark .jodit-ui-select__icon svg{fill:#4c4c4c}.jodit-ui-select__input{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGlkPSJMYXllcl8xIiBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCA0Ljk1IDEwIj48ZGVmcz48c3R5bGU+LmNscy0ye2ZpbGw6IzQ0NH08L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMCAwaDQuOTV2MTBIMHoiIHN0eWxlPSJmaWxsOiNmZmYiLz48cGF0aCBkPSJtMS40MSA0LjY3IDEuMDctMS40OSAxLjA2IDEuNDl6TTMuNTQgNS4zMyAyLjQ4IDYuODIgMS40MSA1LjMzeiIgY2xhc3M9ImNscy0yIi8+PC9zdmc+);background-position:98% 50%;background-repeat:no-repeat;padding-right:calc(8px*2)}.jodit-ui-select_size_tiny{margin-bottom:0}.jodit-ui-select_size_tiny .jodit-ui-select__input{height:calc(32px/1.8);line-height:calc(32px/1.8)}.jodit-ui-select_variant_outline .jodit-ui-select__wrapper{border:0}.jodit-ui-select_variant_outline .jodit-ui-select__wrapper select{outline:0}.jodit-ui-select_width_auto{width:auto}.jodit-ui-select_width_auto .jodit-ui-select__wrapper{min-width:auto}.jodit-ui-text-area{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-bottom:8px;width:100%}.jodit-ui-text-area__input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:0;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit-ui-text-area__input[disabled]{background-color:#f0f0f0;color:#dadada}.jodit-ui-text-area__input_has-error_true{border-color:#ff3b3b}.jodit-ui-text-area__input:focus{outline:0}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__input{background-color:#dadada}.jodit-ui-text-area_has-error_true .jodit-ui-text-area__input{border-color:#ff3b3b}.jodit-ui-text-area__error{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-text-area__label{color:#a5a5a5;display:block;font-size:.8em;margin-bottom:calc(8px/4)}.jodit-ui-text-area__error{color:#ff3b3b}.jodit-ui-text-area_has-error_true .jodit-ui-text-area__label{color:#ff3b3b}.jodit-ui-text-area__wrapper{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#fff;border:1px solid #dadada;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:stretch;-ms-flex-pack:stretch;justify-content:stretch;min-width:200px}@media (max-width:480px){.jodit-ui-text-area__wrapper{min-width:140px}}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__wrapper{background-color:#dadada;border-color:#dadada}.jodit-ui-text-area_focused_true .jodit-ui-text-area__wrapper{border-color:#1e88e5}.jodit-ui-text-area__icon:not(:empty){-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;padding:0 8px}.jodit-ui-text-area__icon:not(:empty) svg{height:16px;width:16px;fill:#dadada}.jodit-ui-text-area__icon:not(:empty)+.jodit-ui-text-area__input{padding-left:0}.jodit-ui-text-area__clear{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;opacity:.8;padding:0 8px 0 0}.jodit-ui-text-area__clear:active{opacity:1;-webkit-transform:scale(1.1);-ms-transform:scale(1.1);transform:scale(1.1)}.jodit-ui-text-area__clear svg{height:12px;width:12px;fill:#dadada}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__clear svg{fill:#4c4c4c}.jodit-ui-text-area_theme_dark .jodit-ui-text-area__icon svg{fill:#4c4c4c}.jodit-ui-text-area__wrapper{-webkit-box-flex:1;-ms-flex:1;flex:1}.jodit-ui-text-area__input{height:100%;min-height:60px;padding:8px}.jodit-ui-checkbox{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:reverse;-ms-flex-direction:row-reverse;flex-direction:row-reverse;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;margin-bottom:8px}.jodit-ui-checkbox__input{margin-right:8px}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__wrapper{display:inline-block;height:34px;margin-right:8px;position:relative;width:60px}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__wrapper input{height:0;opacity:0;width:0}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__switch-slider{background-color:#ccc;border-radius:34px;cursor:pointer;inset:0;position:absolute;-webkit-transition:.4s;transition:.4s}.jodit-ui-checkbox_switch_true .jodit-ui-checkbox__switch-slider:before{background-color:#fff;border-radius:50%;bottom:4px;content:"";height:26px;left:4px;position:absolute;-webkit-transition:.4s;transition:.4s;width:26px}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_checked_true .jodit-ui-checkbox__switch-slider{background-color:#2196f3}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_checked_true .jodit-ui-checkbox__switch-slider:before{-webkit-transform:translateX(26px);-ms-transform:translateX(26px);transform:translateX(26px)}.jodit-ui-checkbox_switch_true.jodit-ui-checkbox_focused_true .jodit-ui-checkbox__switch-slider{-webkit-box-shadow:0 0 1px #2196f3;box-shadow:0 0 1px #2196f3}.jodit-ui-block .jodit-ui-checkbox{margin-bottom:0}.jodit-ui-file-input{overflow:hidden;position:relative}.jodit-ui-file-input__input{bottom:0;cursor:pointer;font-size:400px;margin:0 calc(8px*-1) 0 0;opacity:0;padding:0;position:absolute;right:0;top:0}@-webkit-keyframes a{30%{opacity:.6}60%{opacity:0}to{opacity:.6}}@keyframes a{30%{opacity:.6}60%{opacity:0}to{opacity:.6}}.jodit-progress-bar{border-radius:1px;height:2px;left:0;opacity:.7;position:absolute;top:0;z-index:2147483647}.jodit-progress-bar div{background:#b91f1f;height:2px;position:relative;-webkit-transition:width .5s ease-out,opacity .5s linear;transition:width .5s ease-out,opacity .5s linear;will-change:width,opacity}.jodit-progress-bar div:after{-webkit-animation:a 2s ease-out 0s infinite;animation:a 2s ease-out 0s infinite;border-radius:100%;-webkit-box-shadow:#b91f1f 1px 0 6px 1px;box-shadow:#b91f1f 1px 0 6px 1px;content:"";display:inline-block;height:2px;opacity:.6;position:absolute;top:0}.jodit-progress-bar div:before{-webkit-animation:a 2s ease-out 0s infinite;animation:a 2s ease-out 0s infinite;border-radius:100%;-webkit-box-shadow:#b91f1f 1px 0 6px 1px;box-shadow:#b91f1f 1px 0 6px 1px;content:"";display:inline-block;height:2px;opacity:.6;position:absolute;top:0}.jodit-progress-bar div:before{right:-80px;width:180px;clip:rect(-6px,90px,14px,-6px)}.jodit-progress-bar div:after{right:0;width:20px;clip:rect(-6px,22px,14px,8px)}.jodit-ui-messages{bottom:0;height:0;overflow:visible;position:absolute;right:0;width:0;z-index:3}.jodit-ui-message{background:#cfe2ff;border:1px solid #b6d4fe;border-radius:0.375rem;bottom:0;color:#084298;cursor:pointer;display:block;font-size:1rem;opacity:0;padding:0.5rem 1rem;position:absolute;right:calc(8px/2);-webkit-transition:opacity .1s linear,bottom .3s linear,-webkit-transform .1s ease-out;transition:opacity .1s linear,bottom .3s linear,-webkit-transform .1s ease-out;transition:opacity .1s linear,bottom .3s linear,transform .1s ease-out;transition:opacity .1s linear,bottom .3s linear,transform .1s ease-out,-webkit-transform .1s ease-out;white-space:pre}.jodit-ui-message_active_true{opacity:1}.jodit-ui-message:active{-webkit-transform:scale(.76);-ms-transform:scale(.76);transform:scale(.76)}.jodit-ui-message_variant_danger{background:#f8d7da;border-color:#f5c2c7;color:#842029}.jodit-ui-message_variant_error{background:#f8d7da;border-color:#f5c2c7;color:#842029}.jodit-ui-message_variant_secondary{background:#e2e3e5;border-color:#d3d6d8;color:#41464b}.jodit-ui-message_variant_success{background:#d1e7dd;border-color:#badbcc;color:#0f5132}.jodit-toolbar-collection,.jodit-toolbar-editor-collection{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#dadada calc(14px + calc((14px - 4px)*2) + 2px*2));position:relative}.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#dadada calc(14px + calc((14px - 4px)*2) + 2px*2));position:relative}.jodit-toolbar-collection_mode_horizontal:after{background-color:#fff;bottom:0;content:"";display:block;height:1px;left:0;position:absolute;width:100%}.jodit-toolbar-editor-collection_mode_horizontal:after{background-color:#fff;bottom:0;content:"";display:block;height:1px;left:0;position:absolute;width:100%}.jodit-toolbar-collection_size_tiny.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 19px,#dadada 20px)}.jodit-toolbar-collection_size_tiny.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 19px,#dadada 20px)}.jodit-toolbar-editor-collection_size_tiny.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 19px,#dadada 20px)}.jodit-toolbar-editor-collection_size_tiny.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 19px,#dadada 20px)}.jodit-toolbar-collection_size_xsmall.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 25px,#dadada 26px)}.jodit-toolbar-collection_size_xsmall.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 25px,#dadada 26px)}.jodit-toolbar-editor-collection_size_xsmall.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 25px,#dadada 26px)}.jodit-toolbar-editor-collection_size_xsmall.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 25px,#dadada 26px)}.jodit-toolbar-collection_size_small.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 31px,#dadada 32px)}.jodit-toolbar-collection_size_small.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 31px,#dadada 32px)}.jodit-toolbar-editor-collection_size_small.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 31px,#dadada 32px)}.jodit-toolbar-editor-collection_size_small.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 31px,#dadada 32px)}.jodit-toolbar-collection_size_middle.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 37px,#dadada 38px)}.jodit-toolbar-collection_size_middle.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 37px,#dadada 38px)}.jodit-toolbar-editor-collection_size_middle.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 37px,#dadada 38px)}.jodit-toolbar-editor-collection_size_middle.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 37px,#dadada 38px)}.jodit-toolbar-collection_size_large.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 43px,#dadada 44px)}.jodit-toolbar-collection_size_large.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 43px,#dadada 44px)}.jodit-toolbar-editor-collection_size_large.jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 43px,#dadada 44px)}.jodit-toolbar-editor-collection_size_large.jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent 43px,#dadada 44px)}.jodit-toolbar-collection_mode_vertical .jodit-ui-group,.jodit-toolbar-editor-collection_mode_vertical .jodit-ui-group{background-color:transparent;border:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button{height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2)}.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button{height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2)}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button__button{cursor:pointer;height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2);width:100%}.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button__button{cursor:pointer;height:auto;min-height:calc(14px + calc((14px - 4px)*2) + 2px*2);width:100%}.jodit-toolbar-collection_mode_vertical .jodit-toolbar-button__text:not(:empty),.jodit-toolbar-editor-collection_mode_vertical .jodit-toolbar-button__text:not(:empty){-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left}.jodit-toolbar-collection .jodit-toolbar-button{margin:2px 1px;padding:0}.jodit-toolbar-collection .jodit-toolbar-content{margin:2px 1px;padding:0}.jodit-toolbar-collection .jodit-toolbar-select{margin:2px 1px;padding:0}.jodit-toolbar-editor-collection .jodit-toolbar-button{margin:2px 1px;padding:0}.jodit-toolbar-editor-collection .jodit-toolbar-content{margin:2px 1px;padding:0}.jodit-toolbar-editor-collection .jodit-toolbar-select{margin:2px 1px;padding:0}.jodit-dialog .jodit-toolbar-collection_mode_horizontal,.jodit-dialog .jodit-toolbar-editor-collection_mode_horizontal{background-image:none}.jodit-toolbar-button{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid transparent;border-radius:3px;display:-webkit-box;display:-ms-flexbox;display:flex;height:34px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-width:34px;overflow:hidden}.jodit-toolbar-button__icon{display:none}.jodit-toolbar-button__icon:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.jodit-toolbar-button__text{display:none}.jodit-toolbar-button__text:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-toolbar-button_context_menu .jodit-toolbar-button__text{-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;padding-left:8px;position:relative}.jodit-toolbar-button_context_menu .jodit-toolbar-button__text:before{border-left:1px solid #dadada;content:"";height:35px;left:0;position:absolute;top:calc(8px*-1)}.jodit-toolbar-button__icon:not(:empty)+.jodit-toolbar-button__text:not(:empty){margin-left:8px}.jodit-toolbar-button__icon:empty+.jodit-toolbar-button__text:not(:empty){padding:0 8px;padding:0}.jodit-toolbar-button .jodit-icon{height:14px;width:14px}.jodit-toolbar-button button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-button_text-icons_true button{padding:0 8px}.jodit-toolbar-button_size_tiny{height:16px;min-width:16px}.jodit-toolbar-button_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-button_size_tiny button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-button_size_tiny_text-icons_true button{padding:0 8px}.jodit-toolbar-button_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-button_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-button_size_xsmall button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-button_size_xsmall_text-icons_true button{padding:0 8px}.jodit-toolbar-button_size_small{height:28px;min-width:28px}.jodit-toolbar-button_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-button_size_small button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-button_size_small_text-icons_true button{padding:0 8px}.jodit-toolbar-button_size_large{height:40px;min-width:40px}.jodit-toolbar-button_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-button_size_large button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-button_size_large_text-icons_true button{padding:0 8px}.jodit-toolbar-button__button{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:0;border-radius:3px;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.75);cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-style:normal;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;outline:0;padding:0;padding:0 8px;position:relative;text-align:center;text-decoration:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-toolbar-button__button:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-button__button:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-button__button:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-button__button[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-button__button[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-button__button[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-button__trigger{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:0 3px 3px 0;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;opacity:.4;width:calc(14px + 2px)}.jodit-toolbar-button__trigger:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-button__trigger:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-button__trigger:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-button__trigger[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-button__trigger[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-button__trigger[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-button__trigger svg{width:calc(14px - 4px)}.jodit-toolbar-button_size_tiny .jodit-toolbar-button__trigger{width:calc(8px + 2px)}.jodit-toolbar-button_size_tiny .jodit-toolbar-button__trigger svg{width:calc(8px - 4px)}.jodit-toolbar-button_size_xsmall .jodit-toolbar-button__trigger{width:calc(10px + 2px)}.jodit-toolbar-button_size_xsmall .jodit-toolbar-button__trigger svg{width:calc(10px - 4px)}.jodit-toolbar-button_size_small .jodit-toolbar-button__trigger{width:calc(12px + 2px)}.jodit-toolbar-button_size_small .jodit-toolbar-button__trigger svg{width:calc(12px - 4px)}.jodit-toolbar-button_size_large .jodit-toolbar-button__trigger{width:calc(16px + 2px)}.jodit-toolbar-button_size_large .jodit-toolbar-button__trigger svg{width:calc(16px - 4px)}.jodit-toolbar-button_with-trigger_true .jodit-toolbar-button__button{border-radius:3px 0 0 3px}.jodit-toolbar-button_with-trigger_true:hover:not([disabled]){border-color:#dadada}.jodit-toolbar-button_stroke_false svg{stroke:none}.jodit-toolbar-content{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:1px solid transparent;border-radius:3px;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.75);cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-style:normal;height:34px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;min-width:34px;outline:0;padding:0;position:relative;text-align:center;text-decoration:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-toolbar-content:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-content:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-content:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-content[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-content[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-content[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-content .jodit-icon{height:14px;width:14px}.jodit-toolbar-content button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-content_text-icons_true button{padding:0 8px}.jodit-toolbar-content_size_tiny{height:16px;min-width:16px}.jodit-toolbar-content_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-content_size_tiny button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-content_size_tiny_text-icons_true button{padding:0 8px}.jodit-toolbar-content_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-content_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-content_size_xsmall button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-content_size_xsmall_text-icons_true button{padding:0 8px}.jodit-toolbar-content_size_small{height:28px;min-width:28px}.jodit-toolbar-content_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-content_size_small button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-content_size_small_text-icons_true button{padding:0 8px}.jodit-toolbar-content_size_large{height:40px;min-width:40px}.jodit-toolbar-content_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-content_size_large button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-content_size_large_text-icons_true button{padding:0 8px}.jodit-toolbar-content__icon{display:none}.jodit-toolbar-content__icon:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.jodit-toolbar-content__text{display:none}.jodit-toolbar-content__text:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-toolbar-content_context_menu .jodit-toolbar-content__text{-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;padding-left:8px;position:relative}.jodit-toolbar-content_context_menu .jodit-toolbar-content__text:before{border-left:1px solid #dadada;content:"";height:35px;left:0;position:absolute;top:calc(8px*-1)}.jodit-toolbar-content__icon:not(:empty)+.jodit-toolbar-content__text:not(:empty){margin-left:8px}.jodit-toolbar-content__icon:empty+.jodit-toolbar-content__text:not(:empty){padding:0 8px}.jodit-toolbar-content:focus:not([disabled]){outline:1px dashed #b5d6fd}.jodit-toolbar-content_variant_outline{border:1px solid #dadada}.jodit-toolbar-content_variant_default{background-color:#e3e3e3;color:#212529}.jodit-toolbar-content_variant_default svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default [disabled]{opacity:.7}.jodit-toolbar-content_variant_default:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-toolbar-content_variant_default:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-toolbar-content_variant_default:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_default:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-toolbar-content_variant_primary{background-color:#007bff;color:#fff}.jodit-toolbar-content_variant_primary svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary [disabled]{opacity:.7}.jodit-toolbar-content_variant_primary:hover:not([disabled]){background-color:#0069d9;color:#fff}.jodit-toolbar-content_variant_primary:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary:active:not([disabled]){background-color:#0062cc;color:#fff}.jodit-toolbar-content_variant_primary:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_primary:focus:not([disabled]){outline:1px dashed #0062cc}.jodit-toolbar-content_variant_secondary{background-color:#d8d8d8;border-radius:0;color:#212529}.jodit-toolbar-content_variant_secondary svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary [disabled]{opacity:.7}.jodit-toolbar-content_variant_secondary:hover:not([disabled]){background-color:#c9cdd1;color:#212529}.jodit-toolbar-content_variant_secondary:hover:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary:active:not([disabled]){background-color:#dae0e5;color:#212529}.jodit-toolbar-content_variant_secondary:active:not([disabled]) svg{fill:#212529;stroke:#212529}.jodit-toolbar-content_variant_secondary:focus:not([disabled]){outline:1px dashed #dae0e5}.jodit-toolbar-content_variant_success{background-color:#28a745;color:#fff}.jodit-toolbar-content_variant_success svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success [disabled]{opacity:.7}.jodit-toolbar-content_variant_success:hover:not([disabled]){background-color:#218838;color:#fff}.jodit-toolbar-content_variant_success:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success:active:not([disabled]){background-color:#1e7e34;color:#fff}.jodit-toolbar-content_variant_success:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_success:focus:not([disabled]){outline:1px dashed #1e7e34}.jodit-toolbar-content_variant_danger{background-color:#dc3545;color:#fff}.jodit-toolbar-content_variant_danger svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger [disabled]{opacity:.7}.jodit-toolbar-content_variant_danger:hover:not([disabled]){background-color:#c82333;color:#fff}.jodit-toolbar-content_variant_danger:hover:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger:active:not([disabled]){background-color:#bd2130;color:#fff}.jodit-toolbar-content_variant_danger:active:not([disabled]) svg{fill:#fff;stroke:#fff}.jodit-toolbar-content_variant_danger:focus:not([disabled]){outline:1px dashed #bd2130}.jodit-toolbar-content:hover:not([disabled]){background-color:transparent;opacity:1;outline:0}.jodit-toolbar-select{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid transparent;border-radius:3px;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;height:34px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-width:34px;min-width:100px;overflow:hidden}.jodit-toolbar-select__icon{display:none}.jodit-toolbar-select__icon:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex}.jodit-toolbar-select__text{display:none}.jodit-toolbar-select__text:not(:empty){display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-toolbar-select_context_menu .jodit-toolbar-select__text{-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left;padding-left:8px;position:relative}.jodit-toolbar-select_context_menu .jodit-toolbar-select__text:before{border-left:1px solid #dadada;content:"";height:35px;left:0;position:absolute;top:calc(8px*-1)}.jodit-toolbar-select__icon:not(:empty)+.jodit-toolbar-select__text:not(:empty){margin-left:8px}.jodit-toolbar-select__icon:empty+.jodit-toolbar-select__text:not(:empty){padding:0 8px;padding:0}.jodit-toolbar-select .jodit-icon{height:14px;width:14px}.jodit-toolbar-select button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:34px;min-width:34px;padding:0}.jodit-toolbar-select_text-icons_true button{padding:0 8px}.jodit-toolbar-select_size_tiny{height:16px;min-width:16px}.jodit-toolbar-select_size_tiny .jodit-icon{height:8px;width:8px}.jodit-toolbar-select_size_tiny button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:16px;min-width:16px;padding:0}.jodit-toolbar-select_size_tiny_text-icons_true button{padding:0 8px}.jodit-toolbar-select_size_xsmall{height:22px;min-width:22px}.jodit-toolbar-select_size_xsmall .jodit-icon{height:10px;width:10px}.jodit-toolbar-select_size_xsmall button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:22px;min-width:22px;padding:0}.jodit-toolbar-select_size_xsmall_text-icons_true button{padding:0 8px}.jodit-toolbar-select_size_small{height:28px;min-width:28px}.jodit-toolbar-select_size_small .jodit-icon{height:12px;width:12px}.jodit-toolbar-select_size_small button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:28px;min-width:28px;padding:0}.jodit-toolbar-select_size_small_text-icons_true button{padding:0 8px}.jodit-toolbar-select_size_large{height:40px;min-width:40px}.jodit-toolbar-select_size_large .jodit-icon{height:16px;width:16px}.jodit-toolbar-select_size_large button{-webkit-appearance:none;-moz-appearance:none;appearance:none;height:40px;min-width:40px;padding:0}.jodit-toolbar-select_size_large_text-icons_true button{padding:0 8px}.jodit-toolbar-select__button{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background:0 0;border:0;border-radius:3px;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;color:rgba(0,0,0,.75);cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;font-style:normal;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;outline:0;padding:0;padding:0 8px;position:relative;text-align:center;text-decoration:none;text-transform:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-toolbar-select__button:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select__button:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select__button:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select__button[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select__button[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-select__button[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__trigger{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-radius:0 3px 3px 0;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;opacity:.4;width:calc(14px + 2px)}.jodit-toolbar-select__trigger:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select__trigger:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select__trigger:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select__trigger[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select__trigger[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-select__trigger[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__trigger svg{width:calc(14px - 4px)}.jodit-toolbar-select_size_tiny .jodit-toolbar-select__trigger{width:calc(8px + 2px)}.jodit-toolbar-select_size_tiny .jodit-toolbar-select__trigger svg{width:calc(8px - 4px)}.jodit-toolbar-select_size_xsmall .jodit-toolbar-select__trigger{width:calc(10px + 2px)}.jodit-toolbar-select_size_xsmall .jodit-toolbar-select__trigger svg{width:calc(10px - 4px)}.jodit-toolbar-select_size_small .jodit-toolbar-select__trigger{width:calc(12px + 2px)}.jodit-toolbar-select_size_small .jodit-toolbar-select__trigger svg{width:calc(12px - 4px)}.jodit-toolbar-select_size_large .jodit-toolbar-select__trigger{width:calc(16px + 2px)}.jodit-toolbar-select_size_large .jodit-toolbar-select__trigger svg{width:calc(16px - 4px)}.jodit-toolbar-select_with-trigger_true .jodit-toolbar-button__button{border-radius:3px 0 0 3px}.jodit-toolbar-select_with-trigger_true:hover:not([disabled]){border-color:#dadada}.jodit-toolbar-select_stroke_false svg{stroke:none}.jodit-toolbar-select:focus-visible:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select:hover:not([disabled]){background-color:#dcdcdc;opacity:1;outline:0}.jodit-toolbar-select:active:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select[aria-pressed=true]:not([disabled]){background-color:hsla(0,0%,86%,.4);outline:0}.jodit-toolbar-select[aria-pressed=true]:hover:not([disabled]){background-color:hsla(0,0%,86%,.6)}.jodit-toolbar-select[disabled]{opacity:.3;pointer-events:none}.jodit-toolbar-select__text:not(:empty){-webkit-box-pack:left;-ms-flex-pack:left;justify-content:left}.jodit-toolbar-select__button{-webkit-box-flex:1;-ms-flex:1;flex:1}.jodit-toolbar__box:not(:empty){background-color:#fff;border-bottom:1px solid #dadada;border-radius:3px 3px 0 0;overflow:hidden}.jodit-toolbar__box:not(:empty):not(:empty){background-color:#fff}.jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{background-color:#f9f9f9}.jodit-dialog{border:0;-webkit-box-sizing:border-box;box-sizing:border-box;display:none;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:0;position:absolute;width:0;will-change:left,top,width,height}.jodit-dialog_moved_true{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-dialog *{-webkit-box-sizing:border-box;box-sizing:border-box}.jodit-dialog .jodit_elfinder,.jodit-dialog .jodit_elfinder *{-webkit-box-sizing:initial;box-sizing:initial}.jodit-dialog__overlay{background-color:rgba(0,0,0,.5);display:none;height:100%;left:0;overflow:auto;position:fixed;text-align:center;top:0;white-space:nowrap;width:100%;z-index:20000003}.jodit-dialog_static_true .jodit-dialog__overlay{display:none}.jodit-dialog_active_true,.jodit-dialog_modal_true .jodit-dialog__overlay{display:block}.jodit-dialog__panel{background-color:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap;left:0;max-height:100%;max-width:100%;min-height:100px;min-width:200px;position:fixed;top:0;z-index:20000004;-webkit-box-shadow:undefined;box-shadow:undefined;text-align:left;white-space:normal}@media (max-width:480px){.jodit-dialog:not(.jodit-dialog_adaptive_false) .jodit-dialog__panel{height:100%!important;left:0!important;max-width:100%;top:0!important;width:100%!important}}.jodit-dialog_static_true{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;height:auto;position:relative;width:auto;z-index:inherit}.jodit-dialog_static_true .jodit-dialog__panel{border:1px solid #dadada;-webkit-box-shadow:none;box-shadow:none;left:auto!important;position:relative;top:auto!important;width:100%!important;z-index:inherit}.jodit-dialog_theme_dark{background-color:#353535;color:#d1cccc}.jodit-dialog_theme_dark .jodit-dialog__panel{background-color:#353535;color:#d1cccc}.jodit-dialog__header{border-bottom:1px solid #dadada;cursor:move;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-height:50px;text-align:left}.jodit-dialog__header-title{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-negative:3;flex-shrink:3;font-size:18px;font-weight:400;line-height:48px;margin:0;padding:0 8px;vertical-align:top}.jodit-dialog__header-toolbar{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-negative:3;flex-shrink:3;font-size:18px;font-weight:400;line-height:48px;margin:0;padding:0 8px;vertical-align:top}@media (max-width:480px){.jodit-dialog__header-toolbar{padding-left:0}}.jodit-dialog__header-button{color:#222;-ms-flex-preferred-size:48px;flex-basis:48px;font-size:28px;height:48px;line-height:48px;text-align:center;text-decoration:none;-webkit-transition:background-color .2s ease 0s;transition:background-color .2s ease 0s}.jodit-dialog__header-button:hover{background-color:#ecebe9}.jodit-dialog__header .jodit_toolbar{background:transparent;border:0;-webkit-box-shadow:none;box-shadow:none}.jodit-dialog__header .jodit_toolbar>li.jodit-toolbar-button .jodit-input{padding-left:8px;width:auto}@media (max-width:480px){.jodit-dialog:not(.jodit-dialog_adaptive_false) .jodit-dialog__header{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.jodit-dialog_slim_true .jodit-dialog__header{min-height:10px}.jodit-dialog_slim_true .jodit-dialog__header-title{padding:0 calc(8px/4)}.jodit-dialog_slim_true .jodit-dialog__header-toolbar{padding:0 calc(8px/4)}.jodit-dialog_theme_dark .jodit-dialog__header{border-color:#4c4c4c}.jodit-dialog_fullsize_true .jodit-dialog__header{cursor:default}.jodit-dialog__content{-webkit-box-flex:1;-ms-flex:1;flex:1;min-height:100px;overflow:auto}.jodit-dialog__content .jodit-form__group{margin-bottom:calc(8px*1.5);padding:0 8px}.jodit-dialog__content .jodit-form__group:first-child{margin-top:8px}.jodit-dialog__content .jodit-form__group .jodit-input_group{border-collapse:separate;display:table;width:100%}.jodit-dialog__content .jodit-form__group .jodit-input_group>*{display:table-cell;height:34px;vertical-align:middle}.jodit-dialog__content .jodit-form__group .jodit-input_group>input{margin:0!important}.jodit-dialog__content .jodit-form__group .jodit-input_group>input:not([class*=col-]){width:100%}.jodit-dialog__content .jodit-form__group .jodit-input_group-buttons{font-size:0;vertical-align:middle;white-space:nowrap;width:1%}.jodit-dialog__content .jodit-form__group .jodit-input_group-buttons>.jodit-button{border:1px solid #dadada;border-radius:0;height:34px;line-height:34px;margin-left:-1px}.jodit-dialog__footer{display:none;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding:8px}.jodit-dialog__footer button{margin-right:calc(8px/2)}.jodit-dialog__footer button:last-child{margin-right:0}.jodit-dialog__column{display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-dialog__resizer{display:none;position:relative}.jodit-dialog__resizer svg{bottom:0;cursor:nwse-resize;height:12px;overflow:hidden;position:absolute;right:0;width:12px;fill:#a5a5a5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-dialog_resizable_true .jodit-dialog__resizer{display:block}@media (max-width:480px){.jodit-dialog__resizer{display:none}}.jodit-dialog_prompt{max-width:300px;min-width:200px;padding:8px;word-break:break-all}.jodit-dialog_prompt label{display:block;margin-bottom:calc(8px/2)}.jodit-dialog_alert{max-width:300px;min-width:200px;padding:8px;word-break:break-all}.jodit-dialog_footer_true .jodit-dialog__footer{display:-webkit-box;display:-ms-flexbox;display:flex}.jodit_fullsize .jodit-dialog__panel{height:100%!important;inset:0!important;width:100%!important}.jodit_fullsize .jodit-dialog__panel .jodit-dialog__resizer{display:none}.jodit-dialog .jodit-ui-messages{z-index:20000004}.jodit-image-editor{height:100%;overflow:hidden;padding:8px;width:100%}@media (max-width:768px){.jodit-image-editor{height:auto}}.jodit-image-editor>div,.jodit-image-editor>div>div{height:100%}@media (max-width:768px){.jodit-image-editor>div,.jodit-image-editor>div>div{height:auto;min-height:200px}}.jodit-image-editor *{-webkit-box-sizing:border-box;box-sizing:border-box}.jodit-image-editor .jodit-image-editor__slider-title{background-color:#f9f9f9;border-bottom:1px solid hsla(0,0%,62%,.31);color:#333;cursor:pointer;font-weight:700;line-height:1em;padding:.8em 1em;text-overflow:ellipsis;text-shadow:#f3f3f3 0 1px 0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap}.jodit-image-editor .jodit-image-editor__slider-title svg{display:inline-block;margin-right:8px;vertical-align:middle;width:16px}.jodit-image-editor .jodit-image-editor__slider-content{display:none}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-title{background-color:#5d5d5d;color:#fff;text-shadow:#000 0 1px 0}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-title svg{fill:#fff}.jodit-image-editor .jodit-image-editor__slider.jodit-image-editor_active .jodit-image-editor__slider-content{display:block}.jodit-image-editor__area{background-color:#eee;background-image:linear-gradient(45deg,#dadada 25%,transparent 25%,transparent 75%,#dadada 75%,#dadada),linear-gradient(45deg,#dadada 25%,transparent 25%,transparent 75%,#dadada 75%,#dadada);background-position:0 0,15px 15px;background-size:30px 30px;display:none;height:100%;overflow:hidden;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:100%}.jodit-image-editor__area.jodit-image-editor_active{display:block}.jodit-image-editor__area .jodit-image-editor__box{height:100%;overflow:hidden;pointer-events:none;position:relative;z-index:1}.jodit-image-editor__area .jodit-image-editor__box img{max-height:100%;max-width:100%;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-image-editor__area .jodit-image-editor__croper{background-repeat:no-repeat;border:1px solid #fff;-webkit-box-shadow:0 0 11px #000;box-shadow:0 0 11px #000;height:100px;left:20px;pointer-events:none;position:absolute;top:8px;width:100px;z-index:2}.jodit-image-editor__area .jodit-image-editor__resizer{background-repeat:no-repeat;border:1px solid #fff;-webkit-box-shadow:0 0 11px #000;box-shadow:0 0 11px #000;height:100px;left:20px;pointer-events:none;position:absolute;top:8px;width:100px;z-index:2}.jodit-image-editor__area .jodit-image-editor__croper i.jodit_bottomright{background-color:#8c7878;border:1px solid #383838;border-radius:50%;bottom:calc(8px*-1);-webkit-box-shadow:0 0 11px #000;box-shadow:0 0 11px #000;cursor:se-resize;display:inline-block;height:20px;pointer-events:all;position:absolute;right:calc(8px*-1);width:20px;z-index:4}.jodit-image-editor__area .jodit-image-editor__resizer i.jodit_bottomright{background-color:#8c7878;border:1px solid #383838;border-radius:50%;bottom:calc(8px*-1);-webkit-box-shadow:0 0 11px #000;box-shadow:0 0 11px #000;cursor:se-resize;display:inline-block;height:20px;pointer-events:all;position:absolute;right:calc(8px*-1);width:20px;z-index:4}.jodit-image-editor__area .jodit-image-editor__croper i.jodit_bottomright:active,.jodit-image-editor__area .jodit-image-editor__resizer i.jodit_bottomright:active{border:1px solid #ff0}.jodit-image-editor__area.jodit-image-editor__area_crop{background:#eee;height:100%;line-height:100%;position:relative;text-align:center}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box{height:100%;line-height:100%;overflow:visible;pointer-events:all;text-align:left}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box img{height:100%;max-height:100%;max-width:100%;width:100%}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box:after{background:hsla(0,0%,100%,.3);content:"";inset:0;margin:auto;position:absolute;z-index:1}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box .jodit-image-editor__croper{cursor:move;pointer-events:all}.jodit-image-editor__area.jodit-image-editor__area_crop .jodit-image-editor__box .jodit-image-editor__croper i.jodit-image-editor__sizes{background:rgba(0,0,0,.2);border-radius:.4em;bottom:-30px;color:#fff;display:block;font-size:12px;left:100%;padding:9px 6px;position:absolute;text-align:center;text-shadow:none;white-space:pre}.jodit-image-editor__area.jodit-image-editor__area_crop.jodit-image-editor_active{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-file-browser-files{display:none;height:100%;overflow-anchor:auto;position:relative;vertical-align:top}.jodit-file-browser-files .jodit-button{border-radius:0}.jodit-file-browser-files_loading_true:before{content:"";height:100%;left:0;position:absolute;top:0;width:100%}.jodit-file-browser-files_loading_true:after{-webkit-animation:b 2s ease-out 0s infinite;animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;content:"";display:inline-block;height:48px;left:50%;margin-left:calc(48px/-2);margin-top:calc(48px/-2);opacity:.7;position:absolute;top:50%;vertical-align:middle;width:48px;will-change:transform}.jodit-file-browser-files::-webkit-scrollbar{width:calc(8px/2)}.jodit-file-browser-files::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-files::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}.jodit-file-browser-files_active_true{-ms-flex-line-pack:start;align-content:flex-start;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;overflow-y:auto;padding:calc(8px/2);width:100%}.jodit-file-browser-files__item{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border:1px solid #dadada;display:-webkit-box;display:-ms-flexbox;display:flex;font-size:0;height:150px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:calc(8px/2);overflow:hidden;position:relative;text-align:center;-webkit-transition:border .1s linear,bottom .1s linear;transition:border .1s linear,bottom .1s linear;width:150px}@media (max-width:480px){.jodit-file-browser-files__item{width:calc(50% - 8px)}}.jodit-file-browser-files__item img{max-width:100%}.jodit-file-browser-files__item:hover{border-color:#433b5c}.jodit-file-browser-files__item_active_true{background-color:#b5b5b5;border-color:#1e88e5}.jodit-file-browser-files__item_active_true .jodit-file-browser-files__item-info{background-color:#b5b5b5;color:#fff;text-shadow:none}.jodit-file-browser-files__item-info{background-color:#e9e9e9;bottom:0;color:#333;font-size:14px;left:0;line-height:16px;opacity:.85;overflow:visible;padding:.3em .6em;position:absolute;right:0;text-align:left;text-shadow:#eee 0 1px 0;-webkit-transition:opacity .4s ease;transition:opacity .4s ease;white-space:normal}.jodit-file-browser-files__item-info>span{display:block;font-size:.75em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.jodit-file-browser-files__item-info>span.jodit-file-browser-files__item-info-filename{font-size:.9em;font-weight:700}.jodit-file-browser-files__item:hover:not(.jodit-file-browser-files__item_active_true) .jodit-file-browser-files__item-info{bottom:-100px}.jodit-file-browser-files_view_list{scroll-behavior:smooth}.jodit-file-browser-files_view_list a{border-width:0 0 1px;display:block;height:26px;line-height:26px;margin:0;text-align:left;white-space:nowrap;width:100%}.jodit-file-browser-files_view_list a img{display:inline-block;margin-left:4px;max-width:16px;min-width:16px;vertical-align:middle}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info{background-color:transparent;display:inline-block;font-size:0;height:100%;line-height:inherit;margin-left:4px;padding:0;position:static;vertical-align:middle;width:calc(100% - 20px)}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info>span{display:inline-block;font-size:12px;height:100%}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filename{width:50%}.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filechanged,.jodit-file-browser-files_view_list a .jodit-file-browser-files__item-info-filesize{width:25%}.jodit-file-browser-files_view_list a:hover{background-color:#433b5c}.jodit-file-browser-files_view_list a:hover .jodit-file-browser-files__item-info{color:#fff;text-shadow:none}.jodit-file-browser-files_view_list a:before{content:"";display:inline-block;height:100%;vertical-align:middle}.jodit-file-browser-tree{display:none;height:100%;overflow-anchor:auto;position:relative;vertical-align:top}.jodit-file-browser-tree .jodit-button{border-radius:0}.jodit-file-browser-tree_loading_true:before{content:"";height:100%;left:0;position:absolute;top:0;width:100%}.jodit-file-browser-tree_loading_true:after{-webkit-animation:b 2s ease-out 0s infinite;animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;content:"";display:inline-block;height:48px;left:50%;margin-left:calc(48px/-2);margin-top:calc(48px/-2);opacity:.7;position:absolute;top:50%;vertical-align:middle;width:48px;will-change:transform}.jodit-file-browser-tree::-webkit-scrollbar{width:calc(8px/2)}.jodit-file-browser-tree::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-tree::-webkit-scrollbar-thumb{background-color:#a9a9a9;outline:1px solid #708090}.jodit-file-browser-tree_active_true{background-color:undefined;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;max-width:290px;min-width:200px;overflow-y:auto;width:31%;z-index:2}@media (max-width:480px){.jodit-file-browser-tree_active_true{height:100px;max-width:100%;width:auto}}.jodit-file-browser-tree_active_true::-webkit-scrollbar{width:calc(8px/2)}.jodit-file-browser-tree_active_true::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.jodit-file-browser-tree_active_true::-webkit-scrollbar-thumb{background-color:hsla(0,0%,50%,.5);outline:1px solid #708090}.jodit-file-browser-tree__item{-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-bottom:1px solid #474747;color:#b1b1b1;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;min-height:38px;padding:calc(8px/2) 8px;position:relative;text-decoration:none;-webkit-transition:background-color .2s ease 0s;transition:background-color .2s ease 0s;word-break:break-all}.jodit-file-browser-tree__item-title{color:#b1b1b1;-webkit-box-flex:1;-ms-flex:1;flex:1}.jodit-file-browser-tree__item .jodit-icon_folder{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;height:calc(12px + 4px);-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-left:calc(8px/2);opacity:.3;width:calc(12px + 4px)}.jodit-file-browser-tree__item .jodit-icon_folder svg{height:12px;width:12px;fill:#b1b1b1!important;stroke:#b1b1b1!important}.jodit-file-browser-tree__item .jodit-icon_folder:hover{background:#696969}.jodit-file-browser-tree__item:hover{background-color:#ecebe9}.jodit-file-browser-tree__item:hover-title{color:#222}.jodit-file-browser-tree__item:hover i.jodit-icon_folder{opacity:.6}.jodit-file-browser-tree__source-title{background:#5a5a5a;border-bottom:1px solid #484848;color:#969696;display:block;font-size:12px;padding:2px 4px;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;word-break:break-all}a+.jodit-file-browser-tree__source-title{margin-top:8px}.jodit-file-browser{display:-webkit-box;display:-ms-flexbox;display:flex;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;height:100%}.jodit-file-browser_no-files_true{padding:8px}@media (max-width:480px){.jodit-file-browser{-webkit-box-orient:vertical;-webkit-box-direction:reverse;-ms-flex-flow:column-reverse;flex-flow:column-reverse}}.jodit-dialog .jodit-dialog__header-title.jodit-file-browser__title-box{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;padding-left:8px}.jodit-file-browser-preview{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:auto;max-height:100%;max-width:min(100%,1000px);min-height:min(100%,500px);min-width:400px;position:relative;text-align:center}@media (max-width:768px){.jodit-file-browser-preview{height:100%;max-height:100%;max-width:100%;min-height:auto;min-width:auto}}.jodit-file-browser-preview__box{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-file-browser-preview__navigation{cursor:pointer;height:100%;left:0;position:absolute;top:0}.jodit-file-browser-preview__navigation_arrow_next{left:auto;right:0}.jodit-file-browser-preview__navigation svg{height:45px;position:relative;top:50%;width:45px;fill:#9e9ba7;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);-webkit-transition:fill .3s linear;transition:fill .3s linear}.jodit-file-browser-preview__navigation:hover svg{fill:#000}.jodit-file-browser-preview img{max-height:100%;max-width:100%}.jodit-status-bar{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#f9f9f9;border-radius:0 0 3px 3px;color:rgba(0,0,0,.75);display:-webkit-box;display:-ms-flexbox;display:flex;font-size:11px;height:20px;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;overflow:hidden;padding:0 calc(8px/2);text-transform:uppercase}.jodit-status-bar_resize-handle_true{padding-right:14px}.jodit-status-bar:before{content:"";-webkit-box-flex:1;-ms-flex:auto;flex:auto;-webkit-box-ordinal-group:2;-ms-flex-order:1;order:1}.jodit-status-bar .jodit-status-bar__item{line-height:1.5714em;margin:0 8px 0 0;-webkit-box-ordinal-group:1;-ms-flex-order:0;order:0;padding:0}.jodit-status-bar .jodit-status-bar__item{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;font-size:11px}.jodit-status-bar .jodit-status-bar__item>span{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;font-size:11px}.jodit-status-bar .jodit-status-bar__item.jodit-status-bar__item-right{margin:0 0 0 8px;-webkit-box-ordinal-group:3;-ms-flex-order:2;order:2}.jodit-status-bar .jodit-status-bar__item a{border-radius:3px;cursor:default;text-decoration:none}.jodit-status-bar .jodit-status-bar__item a:hover{background-color:#dadada;text-decoration:none}.jodit-status-bar a.jodit-status-bar-link{cursor:pointer}.jodit-status-bar a.jodit-status-bar-link{background-color:transparent;color:rgba(0,0,0,.75)}.jodit-status-bar a.jodit-status-bar-link:hover{background-color:transparent;color:rgba(0,0,0,.75)}.jodit-status-bar a.jodit-status-bar-link:visited{background-color:transparent;color:rgba(0,0,0,.75)}.jodit-status-bar a.jodit-status-bar-link:hover{text-decoration:underline}.jodit-workplace+.jodit-status-bar:not(:empty){border-top:1px solid #dadada}.jodit_disabled .jodit-status-bar{opacity:.4}.jodit-drag-and-drop__file-box{border:1px dashed #dadada;margin:8px 0;overflow:hidden;padding:25px 0;position:relative;text-align:center;width:100%}.jodit_uploadfile_button{border:1px dashed #dadada;margin:8px 0;overflow:hidden;padding:25px 0;position:relative;text-align:center;width:100%}.jodit-drag-and-drop__file-box:hover{background-color:#ecebe9}.jodit_uploadfile_button:hover{background-color:#ecebe9}.jodit-drag-and-drop__file-box input,.jodit_uploadfile_button input{cursor:pointer;font-size:400px;inset:0;margin:0;opacity:0;padding:0;position:absolute}@media (max-width:768px){.jodit-drag-and-drop__file-box{max-width:100%;min-width:180px;width:auto}}.jodit-add-new-line{display:block;height:1px;outline:none;position:fixed;top:0;z-index:1}.jodit-add-new-line,.jodit-add-new-line *{-webkit-box-sizing:border-box;box-sizing:border-box}.jodit-add-new-line:after{background-color:#6b6b6b;content:"";display:block;height:1px;width:100%}.jodit-add-new-line span{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background:hsla(40,7%,92%,.3);border:1px solid #6b6b6b;cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;height:20px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;left:calc(100% - 20px);position:absolute;top:0;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);width:20px}.jodit-add-new-line span:hover{background:#ecebe9}.jodit-add-new-line svg{width:calc(20px/2);fill:#6b6b6b}.jodit-source__mode .jodit-add-new-line{display:none!important}.jodit-color-picker{margin:0;text-align:left;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-color-picker__group{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;margin-bottom:calc(8px/2);max-width:calc(24px*10);white-space:normal}.jodit-color-picker__color-item{border:1px solid transparent;display:block;height:24px;text-align:center;text-decoration:none;vertical-align:middle;width:24px}.jodit-color-picker__color-item:hover{border-color:#000}.jodit-color-picker__color-item:active{border:2px solid #1e88e5}.jodit-color-picker__color-item_active_true{border:2px solid #1e88e5}.jodit-color-picker__native svg{display:inline-block;height:16px;margin-right:4px;width:16px}.jodit-color-picker__native input{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;height:18px;padding:0;width:18px}.jodit-color-picker__native input[type=color]::-webkit-color-swatch-wrapper{padding:0}.jodit-color-picker__native input input[type=color]::-webkit-color-swatch{border:none}.jodit-tabs{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px}.jodit-tabs .jodit-tabs__buttons{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin-bottom:8px;margin-top:calc(8px/2)}.jodit-tabs .jodit-tabs__buttons>*{cursor:pointer;margin-left:calc(8px/2)}.jodit-tabs .jodit-tabs__buttons>:only-of-type{width:100%}.jodit-tabs .jodit-tabs__buttons>:first-child{margin-left:0}@media (max-width:480px){.jodit-tabs .jodit-tabs__buttons{display:block}.jodit-tabs .jodit-tabs__buttons>*{margin-left:0;width:100%}}.jodit-tabs__button{min-width:80px}.jodit-tabs__button_columns_3{width:33.33333%}.jodit-tabs__button_columns_2{width:50%}.jodit-tabs .jodit-tabs__wrapper .jodit-tab{display:none}.jodit-tabs .jodit-tabs__wrapper .jodit-tab.jodit-tab_active{display:block}.jodit-tabs .jodit-tabs__wrapper .jodit-tab.jodit-tab_empty{min-height:100px;min-width:220px}.jodit_fullsize-box_true{overflow:visible!important;position:static!important;z-index:100000!important}body.jodit_fullsize-box_true,html.jodit_fullsize-box_true{height:0!important;overflow:hidden!important;width:0!important}html.jodit_fullsize-box_true{position:fixed!important}.jodit_fullsize{inset:0;max-width:none!important;position:absolute;z-index:100000}.jodit_fullsize .toolbar{width:100%!important}.jodit_fullsize .jodit__area,.jodit_fullsize .jodit_editor{height:100%}.jodit-ui-image-position-tab__lockMargin>svg{display:inline-block;height:14px;overflow:hidden;width:14px;fill:#4c4c4c;line-height:14px;-webkit-transform-origin:0 0!important;-ms-transform-origin:0 0!important;transform-origin:0 0!important;vertical-align:middle}.jodit-ui-image-position-tab__lockSize>svg{display:inline-block;height:14px;overflow:hidden;width:14px;fill:#4c4c4c;line-height:14px;-webkit-transform-origin:0 0!important;-ms-transform-origin:0 0!important;transform-origin:0 0!important;vertical-align:middle}.jodit-ui-image-properties-form__lockMargin>svg{display:inline-block;height:14px;overflow:hidden;width:14px;fill:#4c4c4c;line-height:14px;-webkit-transform-origin:0 0!important;-ms-transform-origin:0 0!important;transform-origin:0 0!important;vertical-align:middle}.jodit-ui-image-properties-form__lockSize>svg{display:inline-block;height:14px;overflow:hidden;width:14px;fill:#4c4c4c;line-height:14px;-webkit-transform-origin:0 0!important;-ms-transform-origin:0 0!important;transform-origin:0 0!important;vertical-align:middle}.jodit-ui-image-position-tab__view-box{padding:8px}.jodit-ui-image-properties-form__view-box{padding:8px}.jodit-ui-image-position-tab__imageView{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#f5f5f6;display:-webkit-box;display:-ms-flexbox;display:flex;height:180px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:0 0 8px;padding:0}.jodit-ui-image-properties-form__imageView{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#f5f5f6;display:-webkit-box;display:-ms-flexbox;display:flex;height:180px;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;margin:0 0 8px;padding:0}.jodit-ui-image-position-tab__imageView img,.jodit-ui-image-properties-form__imageView img{max-height:100%;max-width:100%}.jodit-ui-image-position-tab__imageSizes.jodit-form__group,.jodit-ui-image-properties-form__imageSizes.jodit-form__group{-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;margin:0;min-width:auto;padding:0}.jodit-ui-image-position-tab__imageSizes.jodit-form__group a,.jodit-ui-image-properties-form__imageSizes.jodit-form__group a{cursor:pointer;display:inline-block}.jodit-ui-image-position-tab .jodit-form__group,.jodit-ui-image-properties-form .jodit-form__group{padding:0}.jodit-ui-image-position-tab__tabsBox{padding:0 8px}.jodit-ui-image-properties-form__tabsBox{padding:0 8px}.jodit-ui-image-properties-form_lock_true:before{background-color:hsla(0,0%,86%,.6);content:"";height:100%;left:0;position:absolute;top:0;width:100%;z-index:3}.jodit-ui-image-properties-form_lock_true:after{-webkit-animation:b 2s ease-out 0s infinite;animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;background-size:48px;content:"";display:inline-block;height:48px;left:50%;margin-left:-10px;margin-top:-10px;position:absolute;top:50%;vertical-align:middle;width:48px;will-change:transform}.jodit-popup-inline__container{min-width:700px;z-index:1300}.jodit-paste-storage{max-width:600px;padding:8px}@media (max-width:768px){.jodit-paste-storage{max-width:100%}}.jodit-paste-storage>div{border:1px solid #dadada;max-height:300px;max-width:100%}.jodit-paste-storage>div:first-child{margin-bottom:8px}.jodit-paste-storage>div:first-child a{border:1px solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:#4c4c4c;display:block;margin:0;max-width:100%;outline:none;overflow:hidden;padding:calc(8px/2);text-decoration:none;text-overflow:ellipsis;white-space:pre}.jodit-paste-storage>div:first-child a.jodit_active{background-color:#575757;color:#fff}.jodit-paste-storage>div:first-child a:focus{outline:none}.jodit-paste-storage>div:last-child{overflow:auto;padding:8px}.jodit-paste-storage>div:last-child li,.jodit-paste-storage>div:last-child ul{margin:0}.jodit-placeholder{color:#a5a5a5;display:block;left:0;padding:8px;pointer-events:none;position:absolute;top:0;-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important;width:100%;z-index:1}.jodit__preview-box table{border:none;border-collapse:collapse;empty-cells:show;margin-bottom:1em;margin-top:1em;max-width:100%}.jodit__preview-box table tr{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit__preview-box table tr td{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit__preview-box table tr th{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit-table-resizer{cursor:col-resize;margin-left:calc(8px/-2);padding-left:calc(8px/2);padding-right:calc(8px/2);position:absolute;z-index:3}.jodit-table-resizer:after{border:0;content:"";display:block;height:100%;width:0}.jodit-table-resizer_moved{background-color:#b5d6fd;z-index:2}.jodit-table-resizer_moved:after{border-right:1px solid moved}[data-jodit_iframe_wrapper]{display:block;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}[data-jodit_iframe_wrapper] iframe{position:relative}[data-jodit_iframe_wrapper]:after{background:transparent;content:"";cursor:pointer;display:block;inset:0;position:absolute;z-index:1}[data-jodit_iframe_wrapper][data-jodit-wrapper_active=true] iframe{z-index:2}.jodit_lock [data-jodit-wrapper_active=true] iframe{z-index:1}.jodit-resizer{font-size:0;height:100px;left:0;outline:3px solid #98c1f1;pointer-events:none;position:absolute;top:0;width:100px}.jodit-resizer,.jodit-resizer *{-webkit-box-sizing:border-box;box-sizing:border-box}.jodit-resizer>span{background-color:#a5a5a5;color:#fff;display:inline-block;font-size:12px;height:24px;left:50%;line-height:24px;margin-left:calc(70px/-2);margin-top:calc(24px/-2);opacity:0;overflow:visible;position:absolute;text-align:center;top:50%;-webkit-transition:opacity .2s linear;transition:opacity .2s linear;width:70px}.jodit-resizer>div{background-color:#5ba4f3;display:inline-block;height:10px;pointer-events:all;position:absolute;width:10px;z-index:4}.jodit-resizer>div:hover{background-color:#537ebb}.jodit-resizer>div:first-child{cursor:nwse-resize;left:calc(10px/-2);top:calc(10px/-2)}.jodit-resizer>div:nth-child(2){cursor:nesw-resize;right:calc(10px/-2);top:calc(10px/-2)}.jodit-resizer>div:nth-child(3){bottom:calc(10px/-2);cursor:nwse-resize;right:calc(10px/-2)}.jodit-resizer>div:nth-child(4){bottom:calc(10px/-2);cursor:nesw-resize;left:calc(10px/-2)}.jodit-ui-search{height:0;position:absolute;right:0;top:0;width:0}.jodit-ui-search_sticky_true{position:fixed}.jodit-ui-search__box{background-color:#f9f9f9;border:solid #dadada;border-width:0 0 1px 1px;display:-webkit-box;display:-ms-flexbox;display:flex;max-width:100vw;padding:calc(8px/2);position:absolute;right:0;width:320px}.jodit-ui-search__box input{background-color:transparent;border:0;height:100%;margin:0;outline:none;padding:0 8px;width:100%}.jodit-ui-search__box input[data-ref=replace]{display:none}.jodit-ui-search__box input:not(:focus)+input:not(:focus){border-top:1px solid #dadada}.jodit-ui-search__buttons{height:30px}.jodit-ui-search__counts{height:30px}.jodit-ui-search__inputs{height:30px}.jodit-ui-search__inputs{padding-right:calc(8px/2);width:60%}.jodit-ui-search__counts{border-left:1px solid #dadada;color:#dadada;width:15%}.jodit-ui-search__buttons,.jodit-ui-search__counts{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit-ui-search__buttons{-webkit-box-flex:1;-ms-flex:1;flex:1;padding-left:0}.jodit-ui-search__buttons button{background-color:transparent;border:1px solid transparent;height:100%;margin-right:1%;width:32%}.jodit-ui-search__buttons button[data-ref=replace-btn]{border:1px solid #dadada;display:none;margin-top:2px;width:100%}.jodit-ui-search__buttons button:hover{background-color:#ecebe9}.jodit-ui-search__buttons button:focus{border:1px solid rgba(181,214,253,.995)}.jodit-ui-search__buttons button:active{border:1px solid #b5d6fd;-webkit-transform:scale(0.95);-ms-transform:scale(0.95);transform:scale(0.95)}.jodit-ui-search_empty-query_true [data-ref=next],.jodit-ui-search_empty-query_true [data-ref=prev]{opacity:.5}.jodit-ui-search_replace_true .jodit-ui-search__counts{height:calc(30px*2)}.jodit-ui-search_replace_true .jodit-ui-search__inputs{height:calc(30px*2)}.jodit-ui-search_replace_true .jodit-ui-search__counts input{height:50%;-webkit-transition:background-color 0.1s linear;transition:background-color 0.1s linear}.jodit-ui-search_replace_true .jodit-ui-search__inputs input{height:50%;-webkit-transition:background-color 0.1s linear;transition:background-color 0.1s linear}.jodit-ui-search_replace_true .jodit-ui-search__counts input:focus{-webkit-box-shadow:inset 0 0 3px 0 #dadada;box-shadow:inset 0 0 3px 0 #dadada}.jodit-ui-search_replace_true .jodit-ui-search__inputs input:focus{-webkit-box-shadow:inset 0 0 3px 0 #dadada;box-shadow:inset 0 0 3px 0 #dadada}.jodit-ui-search_replace_true .jodit-ui-search__counts input[data-ref=replace],.jodit-ui-search_replace_true .jodit-ui-search__inputs input[data-ref=replace]{display:block}.jodit-ui-search_replace_true .jodit-ui-search__buttons{-ms-flex-wrap:wrap;flex-wrap:wrap}.jodit-ui-search_replace_true .jodit-ui-search__buttons button[data-ref=replace-btn]{display:block}::highlight(jodit-search-result){background-color:#b5d6fd;color:#fff}[jd-tmp-selection]{background-color:#b5d6fd;color:#fff}.jodit-container:not(.jodit_inline){min-height:100px}.jodit-container:not(.jodit_inline) .jodit-workplace{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:auto;min-height:50px;overflow:hidden}.jodit-container:not(.jodit_inline) .jodit-editor__resize{position:relative}.jodit-container:not(.jodit_inline) .jodit-editor__resize svg{bottom:0;cursor:nwse-resize;height:12px;overflow:hidden;position:absolute;right:0;width:12px;fill:#a5a5a5;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-source{background-color:#323232;display:none;-webkit-box-flex:1;-ms-flex:auto;flex:auto;overflow:auto;position:relative}.jodit-source,.jodit-source .jodit-source__mirror-fake{min-height:100%}.jodit-source *{font:12px/normal Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace}.jodit-container.jodit-source__mode .jodit-wysiwyg,.jodit-container.jodit-source__mode .jodit-wysiwyg_iframe{display:none!important}.jodit-container.jodit-source__mode .jodit-source{display:block!important}.jodit-container.jodit_split_mode .jodit-workplace{-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap}.jodit-container.jodit_split_mode .jodit-source,.jodit-container.jodit_split_mode .jodit-wysiwyg,.jodit-container.jodit_split_mode .jodit-wysiwyg_iframe{display:block!important;-webkit-box-flex:1;-ms-flex:1;flex:1;width:50%}.jodit-source__mirror{background:#323232;border:0;-webkit-box-shadow:none;box-shadow:none;-webkit-box-sizing:border-box;box-sizing:border-box;color:#f0f0f0;height:100%;line-height:1.5;font:12px/normal Monaco,Menlo,Ubuntu Mono,Consolas,source-code-pro,monospace;margin:0;min-height:100%;outline:none;overflow:auto;padding:8px;resize:none;-moz-tab-size:2em;-o-tab-size:2em;tab-size:2em;white-space:pre-wrap;width:100%;z-index:2}.jodit-source__mirror::-moz-selection{background:#bdbdbd}.jodit-source__mirror::selection{background:#bdbdbd}.jodit_sticky-dummy_toolbar{display:none}.jodit_sticky>.jodit-toolbar__box{border-bottom:1px solid #dadada;left:auto;position:fixed;position:sticky;top:0;z-index:3}.jodit_sticky .jodit_sticky-dummy_toolbar{display:block}.jodit-symbols{padding:8px;width:460px}.jodit-symbols__container{display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-symbols__container_table{width:88%}.jodit-symbols__container_preview{width:12%}.jodit-symbols__preview{border:1px solid #dadada;font-size:34px;padding:20px 0;text-align:center}.jodit-symbols__table{border:0;border-spacing:0;table-layout:fixed}.jodit-symbols__table td{padding:0}.jodit-symbols__table td a{border:1px solid transparent;-webkit-box-sizing:border-box;box-sizing:border-box;color:#222;cursor:pointer;display:inline-block;font-size:16px;height:calc(18px*1.2);line-height:calc(18px*1.2);text-align:center;text-decoration:none;vertical-align:top;width:calc(18px*1.2)}.jodit-symbols__table td a:focus{outline:2px solid #dadada}.jodit-symbols__table td a:hover{outline:2px solid #dadada}.jodit-ui-ai-assistant{min-width:460px;padding:8px;width:100%}@media (max-width:768px){.jodit-ui-ai-assistant{min-width:100%}}.jodit-ui-ai-assistant__body{margin-bottom:10px}.jodit-ui-ai-assistant__prompt-row{-webkit-box-align:start;-ms-flex-align:start;align-items:flex-start;display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:10px}.jodit-ui-ai-assistant__prompt-row-label{margin-right:10px}.jodit-ui-ai-assistant__prompt-row-input{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-right:10px}.jodit-ui-ai-assistant__prompt-row .jodit-icon_ai_assistant{cursor:pointer;height:22px;width:22px}.jodit-ui-ai-assistant__prompt-row .jodit-ui-button{margin-right:10px}.jodit-ui-ai-assistant__prompt-row .jodit-ui-button_ai_assistant{margin-right:0;margin-top:20px}.jodit-ui-ai-assistant__results{border-color:#a5a5a5;border-style:solid;border-width:1px;height:300px;line-height:1.5;max-width:460px;min-height:300px;min-width:100%;overflow:auto;padding:8px;position:relative}.jodit-ui-ai-assistant__results p{margin:0 0 10px}.jodit-ui-ai-assistant__close{cursor:pointer;padding:10px;position:absolute;right:0;top:0}.jodit-ui-ai-assistant_hide_true{display:none}.jodit-ui-ai-assistant__spinner:before{-webkit-animation:b .6s linear infinite;animation:b .6s linear infinite;border:1px solid #ccc;border-radius:50%;border-top-color:#8817c3;-webkit-box-sizing:border-box;box-sizing:border-box;content:"";height:30px;left:50%;margin-left:-15px;margin-top:-15px;position:absolute;top:50%;width:30px}.jodit-ui-ai-assistant__error{color:#ff3b3b}.jodit-context table,.jodit-wysiwyg table{border:none;border-collapse:collapse;empty-cells:show;margin-bottom:1em;margin-top:1em;max-width:100%}.jodit-context table tr,.jodit-wysiwyg table tr{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.jodit-context table tr td{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit-context table tr th{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit-wysiwyg table tr td{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit-wysiwyg table tr th{border:1px solid #dadada;min-width:2em;padding:.4em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text;vertical-align:middle}.jodit-form__inserter .jodit-form__table-creator-box{display:-webkit-box;display:-ms-flexbox;display:flex}@media (max-width:768px){.jodit-form__inserter .jodit-form__table-creator-box{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container{font-size:0;margin:0;min-width:180px;padding:0}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span{border:1px solid #dadada;-webkit-box-sizing:border-box;box-sizing:border-box;display:inline-block;height:18px;margin-bottom:2px;margin-left:2px;vertical-align:top;width:18px}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span:first-child{margin-left:0}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__container>div>span.jodit_hovered{background:#dcdcdc;border-color:#dcdcdc}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options{font-size:14px}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options label{padding-top:0;text-align:left}.jodit-form__inserter .jodit-form__table-creator-box .jodit-form__options label input{margin-right:8px}.jodit-form__inserter label{font-size:14px;margin:0;padding:8px;text-align:center}.jodit-xpath{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;margin-left:calc(8px/-2)}.jodit-xpath__item{display:-webkit-box;display:-ms-flexbox;display:flex;height:11px;line-height:calc(11px - 1px)}.jodit-xpath__item a{color:#4c4c4c;font-size:11px;margin-left:2px;outline:0;padding:0 3px}.jodit-wysiwyg{outline:0}.jodit-wysiwyg ::-moz-selection, .jodit-wysiwyg::-moz-selection{background:#b5d6fd;color:#4c4c4c}.jodit-wysiwyg ::selection,.jodit-wysiwyg::selection{background:#b5d6fd;color:#4c4c4c}.jodit-container:not(.jodit_inline) .jodit-wysiwyg{margin:0;outline:0;overflow-x:auto;padding:8px;position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg img{max-width:100%;position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media{position:relative}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media *{position:relative;z-index:0}.jodit-container:not(.jodit_inline) .jodit-wysiwyg jodit-media:before{content:"";inset:0;position:absolute;z-index:1}.jodit-form{color:#4c4c4c;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px}.jodit-form.jodit_error{border-color:#ff3b3b;-webkit-box-shadow:inset 0 0 3px 0 hsla(0,0%,74%,.3);box-shadow:inset 0 0 3px 0 hsla(0,0%,74%,.3)}@media (max-width:768px){.jodit-form{min-width:150px}}.jodit-form button{background:#d6d6d6;border:none;color:#4c4c4c;cursor:pointer;font-size:16px;height:36px;line-height:1;margin-bottom:8px;margin-top:8px;outline:none;padding:8px;text-decoration:none;-webkit-transition:background .2s ease 0s;transition:background .2s ease 0s}.jodit-form button:hover{background-color:#ecebe9;color:#4c4c4c}.jodit-form button:active{background:#ecebe9;color:#4c4c4c}.jodit-form label{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex;margin-bottom:8px;text-align:left;white-space:nowrap}.jodit-form label:last-child{margin-bottom:0}.jodit-form .jodit-form__center{-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}.jodit .jodit-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #dadada;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit .jodit-select{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #dadada;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit .jodit-textarea{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid #dadada;border-radius:0;-webkit-box-sizing:border-box;box-sizing:border-box;font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;font-size:14px;height:32px;line-height:1.2;outline:none;padding:0 8px;width:100%}.jodit .jodit-input[disabled]{background-color:#f0f0f0;color:#dadada}.jodit .jodit-select[disabled]{background-color:#f0f0f0;color:#dadada}.jodit .jodit-textarea[disabled]{background-color:#f0f0f0;color:#dadada}.jodit .jodit-input_has-error_true{border-color:#ff3b3b}.jodit .jodit-select_has-error_true{border-color:#ff3b3b}.jodit .jodit-textarea_has-error_true{border-color:#ff3b3b}.jodit .jodit-input:focus{border-color:#66afe9;outline:0}.jodit-checkbox{border:0;cursor:pointer;height:16px;margin:0 calc(8px/2) 0 0;outline:none;padding:0;position:relative;width:16px;z-index:2}.jodit-select{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 id=%27Layer_1%27 data-name=%27Layer 1%27 viewBox=%270 0 4.95 10%27%3E%3Cdefs%3E%3Cstyle%3E.cls-2{fill:%23444}%3C/style%3E%3C/defs%3E%3Cpath d=%27M0 0h4.95v10H0z%27 style=%27fill:%23fff%27/%3E%3Cpath d=%27m1.41 4.67 1.07-1.49 1.06 1.49zM3.54 5.33 2.48 6.82 1.41 5.33z%27 class=%27cls-2%27/%3E%3C/svg%3E");background-position:98% 50%;background-repeat:no-repeat;padding-right:calc(8px*2)}.jodit-textarea{height:auto}.jodit-form__group{min-width:180px}.jodit-textarea{min-width:180px}.jodit-form__group{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;margin-bottom:8px}.jodit-form__group label{margin-bottom:calc(8px/2)}.jodit-button{-webkit-box-align:center;-ms-flex-align:center;align-items:center;background-color:#dadada;border:0;border-radius:.25rem;color:#4c4c4c;cursor:pointer;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;height:calc(8px*4);-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;line-height:1;margin:0;padding:0 8px;position:relative;text-decoration:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;width:auto}.jodit-button svg{display:inline-block;height:24px;width:24px}.jodit-button svg+span{margin-left:calc(8px/2)}.jodit-button:active,.jodit-button:focus{outline:0}.jodit-button.disabled{opacity:.7}.jodit-buttons{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:nowrap;flex-wrap:nowrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;margin-bottom:8px}.jodit-button .jodit_icon,.jodit-button svg,.jodit-dialog__header .jodit_icon,.jodit-dialog__header svg{display:inline-block;height:16px;vertical-align:middle;width:16px}.jodit-switcher-wrapper{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-switcher-wrapper .jodit-switcher+span{margin-left:8px}.jodit-switcher{display:inline-block;height:32px;position:relative;width:60px}.jodit-switcher input{height:0;opacity:0;width:0}.jodit-switcher .jodit-switcher__slider{background-color:#dadada;border-radius:32px;cursor:pointer;inset:0;position:absolute;-webkit-transition:.4s;transition:.4s}.jodit-switcher .jodit-switcher__slider:before{background-color:#fff;border-radius:50%;bottom:4px;content:"";height:calc(32px - 4px*2);left:4px;position:absolute;-webkit-transition:.4s;transition:.4s;width:calc(32px - 4px*2)}input:checked+.jodit-switcher__slider{background-color:#2196f3}input:checked+.jodit-switcher__slider:before{-webkit-transform:translateX(calc(60px - 4px*2 - calc(32px - 4px*2)));-ms-transform:translateX(calc(60px - 4px*2 - calc(32px - 4px*2)));transform:translateX(calc(60px - 4px*2 - calc(32px - 4px*2)))}input:focus+.jodit-switcher__slider{-webkit-box-shadow:0 0 1px #2196f3;box-shadow:0 0 1px #2196f3}.jodit-button-group{display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-button-group input{display:none}.jodit-button-group button{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;text-align:center}.jodit-button-group button+button{margin-left:-1px}.jodit-button-group button:first-child,.jodit-button-group input:first-child+button{border-bottom-right-radius:0;border-right:0;border-top-right-radius:0}.jodit-button-group button:last-child,.jodit-button-group input:last-child+button{border-bottom-left-radius:0;border-left:0;border-top-left-radius:0}.jodit-button-group input[type=checkbox]:checked+button,.jodit-button-group input[type=checkbox]:not(:checked)+button+button{background-image:none;-webkit-box-shadow:inset 0 2px 4px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.05);box-shadow:inset 0 2px 4px rgba(0,0,0,.3),0 1px 2px rgba(0,0,0,.05)}.jodit_text_icons .jodit_icon{font-size:14px;width:auto}.jodit_text_icons .jodit_icon:first-letter{text-transform:uppercase}.jodit_text_icons .jodit-tabs .jodit-tabs__buttons>a{font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;width:auto}.jodit_text_icons .jodit-tabs .jodit-tabs__buttons>a i{width:auto}.jodit_text_icons.jodit-dialog .jodit-button{color:rgba(0,0,0,.75);font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;padding:8px;width:auto}.jodit_text_icons.jodit-dialog .jodit-dialog__header a{color:rgba(0,0,0,.75);font-family:-apple-system,blinkmacsystemfont,"Segoe UI",roboto,oxygen-sans,ubuntu,cantarell,"Helvetica Neue",sans-serif;padding:8px;width:auto}.jodit_text_icons.jodit-dialog .jodit-button .jodit_icon,.jodit_text_icons.jodit-dialog .jodit-dialog__header a .jodit_icon{width:auto}.jodit-grid{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%}.jodit-grid.jodit-grid_column{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}@media (max-width:480px){.jodit-grid.jodit-grid_xs-column{-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}}.jodit-grid [class*=jodit_col-]{-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}.jodit-grid .jodit_col-lg-5-5{width:100%}.jodit-grid .jodit_col-lg-4-5{width:80%}.jodit-grid .jodit_col-lg-3-5{width:60%}.jodit-grid .jodit_col-lg-2-5{width:40%}.jodit-grid .jodit_col-lg-1-5{width:20%}.jodit-grid .jodit_col-lg-4-4{width:100%}.jodit-grid .jodit_col-lg-3-4{width:75%}.jodit-grid .jodit_col-lg-2-4{width:50%}.jodit-grid .jodit_col-lg-1-4{width:25%}@media (max-width:992px){.jodit-grid .jodit_col-md-5-5{width:100%}.jodit-grid .jodit_col-md-4-5{width:80%}.jodit-grid .jodit_col-md-3-5{width:60%}.jodit-grid .jodit_col-md-2-5{width:40%}.jodit-grid .jodit_col-md-1-5{width:20%}.jodit-grid .jodit_col-md-4-4{width:100%}.jodit-grid .jodit_col-md-3-4{width:75%}.jodit-grid .jodit_col-md-2-4{width:50%}.jodit-grid .jodit_col-md-1-4{width:25%}}@media (max-width:768px){.jodit-grid .jodit_col-sm-5-5{width:100%}.jodit-grid .jodit_col-sm-4-5{width:80%}.jodit-grid .jodit_col-sm-3-5{width:60%}.jodit-grid .jodit_col-sm-2-5{width:40%}.jodit-grid .jodit_col-sm-1-5{width:20%}.jodit-grid .jodit_col-sm-4-4{width:100%}.jodit-grid .jodit_col-sm-3-4{width:75%}.jodit-grid .jodit_col-sm-2-4{width:50%}.jodit-grid .jodit_col-sm-1-4{width:25%}}@media (max-width:480px){.jodit-grid .jodit_col-xs-5-5{width:100%}.jodit-grid .jodit_col-xs-4-5{width:80%}.jodit-grid .jodit_col-xs-3-5{width:60%}.jodit-grid .jodit_col-xs-2-5{width:40%}.jodit-grid .jodit_col-xs-1-5{width:20%}.jodit-grid .jodit_col-xs-4-4{width:100%}.jodit-grid .jodit_col-xs-3-4{width:75%}.jodit-grid .jodit_col-xs-2-4{width:50%}.jodit-grid .jodit_col-xs-1-4{width:25%}}@-webkit-keyframes b{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes b{to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}.jodit-icon_loader{-webkit-animation:b 2s ease-out 0s infinite;animation:b 2s ease-out 0s infinite;background:url(data:image/png;base64,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) no-repeat 50%;background-size:100% 100%;display:inline-block;height:48px;vertical-align:middle;width:48px;will-change:transform}.jodit-icon{background:50% no-repeat;background-size:contain;height:14px;overflow:visible;width:14px;fill:#4c4c4c;-webkit-transform-origin:0 0!important;-ms-transform-origin:0 0!important;transform-origin:0 0!important}.jodit-icon{stroke:#4c4c4c}.jodit-icon_close{stroke:#4c4c4c}svg.jodit-icon{height:auto;isolation:isolate}.jodit-icon_text{font-size:14px}.jodit,.jodit *,.jodit-container,.jodit-container *{-webkit-box-sizing:border-box;box-sizing:border-box}.jodit .jodit-workplace,.jodit-container .jodit-workplace{overflow:auto;position:relative}.jodit .jodit-workplace .jodit-wysiwyg,.jodit .jodit-workplace .jodit-wysiwyg_iframe,.jodit-container .jodit-workplace .jodit-wysiwyg,.jodit-container .jodit-workplace .jodit-wysiwyg_iframe{height:100%;width:100%}.jodit-wysiwyg [contenteditable=false]{cursor:default}.jodit-container:not(.jodit_inline){background-color:#f5f5f6;border:1px solid #dadada;border-radius:3px}.jodit-container:not(.jodit_inline) .jodit-workplace{background-color:#fff;border:0 solid #dadada;max-height:100%}.jodit-container:not(.jodit_inline).jodit_disabled{background:#dadada}.jodit-container:not(.jodit_inline).jodit_disabled .jodit-workplace{opacity:.4}.jodit_disabled,.jodit_lock{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.jodit_hidden{display:none!important}.jodit_vertical_middle{-webkit-box-align:center;-ms-flex-align:center;align-items:center;display:-webkit-box;display:-ms-flexbox;display:flex}.jodit-box{background:0 0;border:0;float:none;height:auto;margin:0;max-width:none;outline:0;padding:0;position:static;width:auto}.jodit-dialog_theme_dark .jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#6b6b6b calc(14px + calc((14px - 4px)*2) + 2px*2))}.jodit-dialog_theme_dark .jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#6b6b6b calc(14px + calc((14px - 4px)*2) + 2px*2))}.jodit_theme_dark .jodit-toolbar-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#6b6b6b calc(14px + calc((14px - 4px)*2) + 2px*2))}.jodit_theme_dark .jodit-toolbar-editor-collection_mode_horizontal{background-image:repeating-linear-gradient(transparent 0,transparent calc(calc(14px + calc((14px - 4px)*2) + 2px*2) - 1px),#6b6b6b calc(14px + calc((14px - 4px)*2) + 2px*2))}.jodit-dialog_theme_dark .jodit-toolbar-collection_mode_horizontal:after{background-color:#6b6b6b}.jodit-dialog_theme_dark .jodit-toolbar-editor-collection_mode_horizontal:after{background-color:#6b6b6b}.jodit_theme_dark .jodit-toolbar-collection_mode_horizontal:after{background-color:#6b6b6b}.jodit_theme_dark .jodit-toolbar-editor-collection_mode_horizontal:after{background-color:#6b6b6b}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty){border-color:#6b6b6b}.jodit_theme_dark .jodit-toolbar__box:not(:empty){border-color:#6b6b6b}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{background-color:#6b6b6b}.jodit_theme_dark .jodit-toolbar__box:not(:empty) .jodit-toolbar-editor-collection:after{background-color:#6b6b6b}.jodit-dialog_theme_dark .jodit-ui-group_separated_true:not(:last-child,.jodit-ui-group_before-spacer_true):after{border-right-color:#6b6b6b}.jodit_theme_dark .jodit-ui-group_separated_true:not(:last-child,.jodit-ui-group_before-spacer_true):after{border-right-color:#6b6b6b}.jodit-dialog_theme_dark.jodit-container{background-color:#575757;border-color:#dadada}.jodit_theme_dark.jodit-container{background-color:#575757;border-color:#dadada}.jodit-dialog_theme_dark.jodit-container.jodit_disabled{background-color:#575757}.jodit_theme_dark.jodit-container.jodit_disabled{background-color:#575757}.jodit-dialog_theme_dark.jodit-container:not(.jodit_inline) .jodit-workplace{border-color:#575757}.jodit_theme_dark.jodit-container:not(.jodit_inline) .jodit-workplace{border-color:#575757}.jodit-dialog_theme_dark .jodit-popup__content{background:#575757}.jodit_theme_dark .jodit-popup__content{background:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__text{color:#d1cccc}.jodit-dialog_theme_dark .jodit-toolbar-button__text:hover:not([disabled]){color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__text{color:#d1cccc}.jodit-dialog_theme_dark .jodit-toolbar-select__text:hover:not([disabled]){color:#575757}.jodit-dialog_theme_dark .jodit-ui-button__text{color:#d1cccc}.jodit-dialog_theme_dark .jodit-ui-button__text:hover:not([disabled]){color:#575757}.jodit_theme_dark .jodit-toolbar-button__text{color:#d1cccc}.jodit_theme_dark .jodit-toolbar-button__text:hover:not([disabled]){color:#575757}.jodit_theme_dark .jodit-toolbar-select__text{color:#d1cccc}.jodit_theme_dark .jodit-toolbar-select__text:hover:not([disabled]){color:#575757}.jodit_theme_dark .jodit-ui-button__text{color:#d1cccc}.jodit_theme_dark .jodit-ui-button__text:hover:not([disabled]){color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button .jodit-icon{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-toolbar-button .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button .jodit-icon:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button svg{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-toolbar-button svg:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button svg:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit-dialog_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select .jodit-icon{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-toolbar-select .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select .jodit-icon:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select svg{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-toolbar-select svg:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select svg:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit-dialog_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-ui-button .jodit-icon{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-ui-button .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-ui-button .jodit-icon:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-ui-button svg{fill:silver;stroke:silver}.jodit-dialog_theme_dark .jodit-ui-button svg:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-ui-button svg:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-ui-button__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit-dialog_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){stroke:#575757}.jodit-dialog_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-button .jodit-icon{fill:silver;stroke:silver}.jodit_theme_dark .jodit-toolbar-button .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-button .jodit-icon:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-button svg{fill:silver;stroke:silver}.jodit_theme_dark .jodit-toolbar-button svg:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-button svg:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-button__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-select .jodit-icon{fill:silver;stroke:silver}.jodit_theme_dark .jodit-toolbar-select .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-select .jodit-icon:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-select svg{fill:silver;stroke:silver}.jodit_theme_dark .jodit-toolbar-select svg:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-select svg:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-toolbar-select__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-ui-button .jodit-icon{fill:silver;stroke:silver}.jodit_theme_dark .jodit-ui-button .jodit-icon:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-ui-button .jodit-icon:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-ui-button svg{fill:silver;stroke:silver}.jodit_theme_dark .jodit-ui-button svg:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-ui-button svg:hover:not([disabled]){fill:#575757}.jodit_theme_dark .jodit-ui-button__trigger{fill:#4c4c4c;stroke:#4c4c4c}.jodit_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){stroke:#575757}.jodit_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){fill:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-ui-button:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-ui-button__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-ui-button__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-button:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-button__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-button__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-button__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-select:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-select__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-select__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-toolbar-select__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-ui-button:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-ui-button__button:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-ui-button__text:hover:not([disabled]){background-color:silver;color:#575757}.jodit_theme_dark .jodit-ui-button__trigger:hover:not([disabled]){background-color:silver;color:#575757}.jodit-dialog_theme_dark .jodit-status-bar{background-color:#5f5c5c;border-color:#6b6b6b;color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty){background-color:#5f5c5c;border-color:#6b6b6b;color:#d1cccc}.jodit_theme_dark .jodit-status-bar{background-color:#5f5c5c;border-color:#6b6b6b;color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty){background-color:#5f5c5c;border-color:#6b6b6b;color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar{color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar .jodit-status-bar__item a{color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar .jodit-status-bar__item span{color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link{color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link:hover{color:#d1cccc}.jodit-dialog_theme_dark .jodit-status-bar a.jodit-status-bar-link:visited{color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty){color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item a{color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item span{color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link{color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:hover{color:#d1cccc}.jodit-dialog_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:visited{color:#d1cccc}.jodit_theme_dark .jodit-status-bar{color:#d1cccc}.jodit_theme_dark .jodit-status-bar .jodit-status-bar__item a{color:#d1cccc}.jodit_theme_dark .jodit-status-bar .jodit-status-bar__item span{color:#d1cccc}.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link{color:#d1cccc}.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link:hover{color:#d1cccc}.jodit_theme_dark .jodit-status-bar a.jodit-status-bar-link:visited{color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty){color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item a{color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) .jodit-status-bar__item span{color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link{color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:hover{color:#d1cccc}.jodit_theme_dark .jodit-workplace+.jodit-status-bar:not(:empty) a.jodit-status-bar-link:visited{color:#d1cccc}.jodit-dialog_theme_dark .jodit-toolbar__box:not(:empty){background:#5f5c5c}.jodit_theme_dark .jodit-toolbar__box:not(:empty){background:#5f5c5c}.jodit-dialog_theme_dark .jodit-icon-close{stroke:silver}.jodit_theme_dark .jodit-icon-close{stroke:silver}.jodit-dialog_theme_dark .jodit-wysiwyg{background-color:#575757;color:#d1cccc}.jodit-dialog_theme_dark .jodit-wysiwyg_iframe{background-color:#575757;color:#d1cccc}.jodit_theme_dark .jodit-wysiwyg{background-color:#575757;color:#d1cccc}.jodit_theme_dark .jodit-wysiwyg_iframe{background-color:#575757;color:#d1cccc}.jodit-dialog_theme_dark .jodit-form input[type=text]{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit-dialog_theme_dark .jodit-form input[type=url]{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit-dialog_theme_dark .jodit-form textarea{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit_theme_dark .jodit-form input[type=text]{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit_theme_dark .jodit-form input[type=url]{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit_theme_dark .jodit-form textarea{background-color:rgba(81,81,81,.41);border-color:#686767;color:#d1cccc}.jodit-dialog_theme_dark .jodit-form button{background-color:hsla(0,0%,41%,.75);color:#d1cccc}.jodit_theme_dark .jodit-form button{background-color:hsla(0,0%,41%,.75);color:#d1cccc}.jodit-dialog_theme_dark .jodit-placeholder{color:hsla(0,5%,81%,.8)}.jodit_theme_dark .jodit-placeholder{color:hsla(0,5%,81%,.8)}.jodit-dialog_theme_dark .jodit-drag-and-drop__file-box{color:#d1cccc}.jodit-dialog_theme_dark .jodit_uploadfile_button{color:#d1cccc}.jodit_theme_dark .jodit-drag-and-drop__file-box{color:#d1cccc}.jodit_theme_dark .jodit_uploadfile_button{color:#d1cccc}.jodit-dialog_theme_dark .jodit-drag-and-drop__file-box:hover{background-color:hsla(0,0%,41%,.75)}.jodit-dialog_theme_dark .jodit_uploadfile_button:hover{background-color:hsla(0,0%,41%,.75)}.jodit_theme_dark .jodit-drag-and-drop__file-box:hover{background-color:hsla(0,0%,41%,.75)}.jodit_theme_dark .jodit_uploadfile_button:hover{background-color:hsla(0,0%,41%,.75)}.jodit-dialog_theme_dark .jodit-add-new-line:before{border-top-color:#686767}.jodit_theme_dark .jodit-add-new-line:before{border-top-color:#686767}.jodit-dialog_theme_dark .jodit-add-new-line span{background:hsla(0,0%,41%,.75);border-color:#686767}.jodit_theme_dark .jodit-add-new-line span{background:hsla(0,0%,41%,.75);border-color:#686767}.jodit-dialog_theme_dark .jodit-add-new-line span svg{fill:#d1cccc}.jodit_theme_dark .jodit-add-new-line span svg{fill:#d1cccc}.jodit-dialog_theme_dark .jodit-resizer>i{background:hsla(0,0%,41%,.75);border-color:silver}.jodit_theme_dark .jodit-resizer>i{background:hsla(0,0%,41%,.75);border-color:silver}.jodit-dialog_theme_dark .jodit-input{background-color:silver;border-color:#444;color:#444}.jodit-dialog_theme_dark .jodit-select{background-color:silver;border-color:#444;color:#444}.jodit_theme_dark .jodit-input{background-color:silver;border-color:#444;color:#444}.jodit_theme_dark .jodit-select{background-color:silver;border-color:#444;color:#444}.jodit-dialog_theme_dark.jodit-dialog{background-color:#575757}.jodit_theme_dark.jodit-dialog{background-color:#575757}.jodit-dialog_theme_dark.jodit-dialog .jodit-dialog__header{border-color:#444}.jodit-dialog_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item{border-color:#444}.jodit_theme_dark.jodit-dialog .jodit-dialog__header{border-color:#444}.jodit_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item{border-color:#444}.jodit-dialog_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item-info{background-color:#d1cccc}.jodit_theme_dark.jodit-dialog .jodit-filebrowser__files.active .jodit-filebrowser__files-item-info{background-color:#d1cccc}</style></head>

    <body class="size-full bg-primary antialiased jodit_fullsize-box_true">
        <div id="root" inert=""><div class="min-h-dvh bg-white dark:bg-[#0B0D12] text-gray-900 dark:text-white"><header class="flex h-16 items-center justify-between border-b border-secondary bg-primary py-3 pr-2 pl-4 lg:hidden"><div class="flex h-8 w-max items-center justify-start overflow-visible"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-fg-primary dark:text-fg-white aspect-square h-full w-auto shrink-0"><path d="M4 10.2C4 5.22 7.8 2 12 2c4 0 7.64 2.92 7.97 7.5h2.32c.45 0 .67.54.35.85l-3.29 3.29c-.2.2-.51.2-.71 0l-3.29-3.29a.5.5 0 0 1 .35-.85h2.26C17.65 6.24 15.13 4 12 4c-3.35 0-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14q.96-.885 1.77-1.71a2.5 2.5 0 0 1-.27-1.12a2.5 2.5 0 0 1 5 0a2.492 2.492 0 0 1-3.19 2.39c-.78.82-1.67 1.66-2.65 2.52c-.38.33-.95.33-1.33 0C6.45 17.12 4 13.38 4 10.2"></path></svg><div class="aspect-[0.3] h-full"></div><span class="text-xl font-extrabold tracking-tight text-primary">Travel<span class="text-brand-secondary">App</span></span></div><button class="group flex items-center justify-center rounded-lg bg-primary p-2 text-fg-secondary outline-focus-ring hover:bg-primary_hover hover:text-fg-secondary_hover focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" type="button" tabindex="0" aria-expanded="false" id="react-aria3594677181-_r_1_" data-react-aria-pressable="true" aria-label="Expand navigation menu"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="size-6 transition duration-200 ease-in-out group-aria-expanded:opacity-0"><path d="M3 12h12M3 6h18M3 18h18"></path></svg><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="absolute size-6 opacity-0 transition duration-200 ease-in-out group-aria-expanded:opacity-100"><path d="M17 7 7 17M7 7l10 10"></path></svg></button></header><header class="max-lg:hidden"><section class="flex h-16 w-full items-center justify-center bg-primary md:h-18 border-b border-secondary"><div class="flex w-full justify-between pr-3 pl-4 md:px-8"><div class="flex flex-1 items-center gap-4"><a aria-label="Go to homepage" href="/" class="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"><div class="flex w-max items-center justify-start overflow-visible h-8"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-fg-primary dark:text-fg-white aspect-square h-full w-auto shrink-0"><path d="M4 10.2C4 5.22 7.8 2 12 2c4 0 7.64 2.92 7.97 7.5h2.32c.45 0 .67.54.35.85l-3.29 3.29c-.2.2-.51.2-.71 0l-3.29-3.29a.5.5 0 0 1 .35-.85h2.26C17.65 6.24 15.13 4 12 4c-3.35 0-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14q.96-.885 1.77-1.71a2.5 2.5 0 0 1-.27-1.12a2.5 2.5 0 0 1 5 0a2.492 2.492 0 0 1-3.19 2.39c-.78.82-1.67 1.66-2.65 2.52c-.38.33-.95.33-1.33 0C6.45 17.12 4 13.38 4 10.2"></path></svg><div class="aspect-[0.3] h-full"></div><span class="text-xl font-extrabold tracking-tight text-primary">Travel<span class="text-brand-secondary">App</span></span></div></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Close sidebar" id="react-aria3594677181-_r_5_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M17 7 7 17M7 7l10 10"></path></svg></button><nav><ul class="flex items-center gap-0.5"><li class="py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/list" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Itineraries</span></a></li><li class="py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/area" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Areas</span></a></li><li class="py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/site" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Sites</span></a></li><li class="relative py-0.5 group"><button class="group flex items-center rounded-md bg-primary px-3 py-2 outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" id="react-aria3594677181-_r_7_"><span class="text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover">Hotel</span><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-2 size-4 text-fg-quaternary transition-inherit-all"><path d="m6 9 6 6 6-6"></path></svg></button><div class="absolute left-0 top-full z-50 mt-2 hidden min-w-56 rounded-lg border border-secondary bg-primary shadow-lg group-hover:block before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']"><ul class="py-2"><li class="px-2 py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/hotel" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Hotel List</span></a></li><li class="px-2 py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/hotel/category" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Hotel Category</span></a></li></ul></div></li><li class="py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/clientitinerary" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Client Itinerary</span></a></li><li class="py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md outline-focus-ring transition duration-100 ease-linear select-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 bg-active hover:bg-secondary_hover text-brand-secondary" data-rac="" href="/itinerary/saved-itinerary" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true" aria-current="page" data-current="true"><span class="flex-1 text-md transition-inherit-all group-hover:text-secondary_hover truncate text-brand-secondary font-semibold">Quotation</span></a></li><li class="relative py-0.5 group"><button class="group flex items-center rounded-md bg-primary px-3 py-2 outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" id="react-aria3594677181-_r_9_"><span class="text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover">Reports</span><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-2 size-4 text-fg-quaternary transition-inherit-all"><path d="m6 9 6 6 6-6"></path></svg></button><div class="absolute left-0 top-full z-50 mt-2 hidden min-w-56 rounded-lg border border-secondary bg-primary shadow-lg group-hover:block before:absolute before:-top-2 before:left-0 before:h-2 before:w-full before:content-['']"><ul class="py-2"><li class="px-2 py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/reports/mails" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Mails</span></a></li><li class="px-2 py-0.5"><a class="px-3 py-2 group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2" data-rac="" href="/itinerary/reports/quotations" target="_self" rel="noopener noreferrer" tabindex="0" data-react-aria-pressable="true"><span class="flex-1 text-md font-medium text-secondary transition-inherit-all group-hover:text-secondary_hover truncate">Quotations</span></a></li></ul></div></li></ul></nav></div><div class="flex items-center gap-3"><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Switch to Dialer" id="react-aria3594677181-_r_c_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M20 17H4m0 0 4-4m-4 4 4 4M4 7h16m0 0-4-4m4 4-4 4"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Switch to Light" id="react-aria3594677181-_r_f_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M12 2v2m0 16v2M4 12H2m4.314-5.686L4.9 4.9m12.786 1.414L19.1 4.9M6.314 17.69 4.9 19.104m12.786-1.414 1.414 1.414M22 12h-2m-3 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"></path></svg></button><div class="flex gap-0.5"><a href="/settings-01" aria-label="Settings" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M18.727 14.727a1.5 1.5 0 0 0 .3 1.655l.055.054a1.816 1.816 0 0 1 0 2.573 1.818 1.818 0 0 1-2.573 0l-.055-.055a1.5 1.5 0 0 0-1.654-.3 1.5 1.5 0 0 0-.91 1.373v.155a1.818 1.818 0 1 1-3.636 0V20.1a1.5 1.5 0 0 0-.981-1.373 1.5 1.5 0 0 0-1.655.3l-.054.055a1.818 1.818 0 0 1-3.106-1.287 1.818 1.818 0 0 1 .533-1.286l.054-.055a1.5 1.5 0 0 0 .3-1.654 1.5 1.5 0 0 0-1.372-.91h-.155a1.818 1.818 0 1 1 0-3.636H3.9a1.5 1.5 0 0 0 1.373-.981 1.5 1.5 0 0 0-.3-1.655l-.055-.054A1.818 1.818 0 1 1 7.491 4.99l.054.054a1.5 1.5 0 0 0 1.655.3h.073a1.5 1.5 0 0 0 .909-1.372v-.155a1.818 1.818 0 0 1 3.636 0V3.9a1.499 1.499 0 0 0 .91 1.373 1.5 1.5 0 0 0 1.654-.3l.054-.055a1.817 1.817 0 0 1 2.573 0 1.819 1.819 0 0 1 0 2.573l-.055.054a1.5 1.5 0 0 0-.3 1.655v.073a1.5 1.5 0 0 0 1.373.909h.155a1.818 1.818 0 0 1 0 3.636H20.1a1.499 1.499 0 0 0-1.373.91Z"></path></svg></a><a href="/notifications-01" aria-label="Notifications" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M9.354 21c.705.622 1.632 1 2.646 1s1.94-.378 2.646-1M18 8A6 6 0 1 0 6 8c0 3.09-.78 5.206-1.65 6.605-.735 1.18-1.102 1.771-1.089 1.936.015.182.054.252.2.36.133.099.732.099 1.928.099H18.61c1.196 0 1.795 0 1.927-.098.147-.11.186-.179.2-.361.014-.165-.353-.755-1.088-1.936C18.78 13.206 18 11.09 18 8Z"></path></svg></a></div><button class="group relative inline-flex cursor-pointer" data-rac="" type="button" tabindex="0" aria-expanded="false" id="react-aria3594677181-_r_i_" data-react-aria-pressable="true"><div data-avatar="true" class="relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-avatar-contrast-border size-10 outline-1 -outline-offset-1"><img data-avatar-img="true" class="size-full rounded-full object-cover" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?bg=%23E0E0E0"></div></button></div></div></section></header><div class="flex"><div class="z-50 hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex"><aside class="group flex h-full max-h-full max-w-full overflow-y-auto py-1 pl-1 transition duration-100 ease-linear" style="width: 68px;"><div class="flex w-auto flex-col justify-between rounded-xl bg-primary pt-5 ring-1 ring-secondary transition duration-300 ring-inset"><div class="flex justify-center px-3"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="text-fg-primary dark:text-fg-white size-8"><path d="M4 10.2C4 5.22 7.8 2 12 2c4 0 7.64 2.92 7.97 7.5h2.32c.45 0 .67.54.35.85l-3.29 3.29c-.2.2-.51.2-.71 0l-3.29-3.29a.5.5 0 0 1 .35-.85h2.26C17.65 6.24 15.13 4 12 4c-3.35 0-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14q.96-.885 1.77-1.71a2.5 2.5 0 0 1-.27-1.12a2.5 2.5 0 0 1 5 0a2.492 2.492 0 0 1-3.19 2.39c-.78.82-1.67 1.66-2.65 2.52c-.38.33-.95.33-1.33 0C6.45 17.12 4 13.38 4 10.2"></path></svg></div><ul class="mt-4 flex flex-col gap-0.5 px-3" data-menu-list="true"><li><a href="/dashboard" aria-label="Dashboard" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M12 16a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M3 10.565c0-.574 0-.861.074-1.126a2 2 0 0 1 .318-.65c.163-.22.39-.397.843-.75l6.783-5.275c.351-.273.527-.41.72-.462a1 1 0 0 1 .523 0c.194.052.37.189.721.462l6.783 5.275c.453.353.68.53.843.75.145.195.252.416.318.65.074.265.074.552.074 1.126V17.8c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8v-7.235Z"></path></svg></a></li><li><a href="/itinerary/list" aria-label="Itinerary" class="relative flex cursor-pointer items-center justify-center rounded-md p-2 outline-focus-ring transition duration-100 ease-linear select-none hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 bg-active text-brand-secondary hover:bg-secondary_hover size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="m9 18-7 4V6l7-4m0 16 7 4m-7-4V2m7 20 6-4V2l-6 4m0 16V6m0 0L9 2"></path></svg></a></li><li><a href="/bookings/booking" aria-label="Bookings" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M6.5 17h10.83c.95 0 1.424 0 1.811-.172a2 2 0 0 0 .844-.703c.238-.35.323-.818.493-1.753l1.35-7.429c.06-.324.089-.486.043-.612a.5.5 0 0 0-.22-.264C21.536 6 21.372 6 21.042 6H5.001M2 2h1.316c.243 0 .364 0 .463.044a.5.5 0 0 1 .212.182c.059.09.078.21.116.45l2.786 17.649c.038.24.057.36.116.45a.5.5 0 0 0 .212.18c.099.045.22.045.463.045H19"></path></svg></a></li><li><a href="/packages/list" aria-label="Packages" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M20.5 8v8.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C18.22 21 17.38 21 15.7 21H8.3c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C3.5 18.72 3.5 17.88 3.5 16.2V8m.1-5h16.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C22 3.76 22 4.04 22 4.6v1.8c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437C21.24 8 20.96 8 20.4 8H3.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C2 7.24 2 6.96 2 6.4V4.6c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C2.76 3 3.04 3 3.6 3Zm6 8.5h4.8c.56 0 .84 0 1.054.109a1 1 0 0 1 .437.437C16 12.26 16 12.54 16 13.1v.8c0 .56 0 .84-.109 1.054a1 1 0 0 1-.437.437c-.214.109-.494.109-1.054.109H9.6c-.56 0-.84 0-1.054-.109a1 1 0 0 1-.437-.437C8 14.74 8 14.46 8 13.9v-.8c0-.56 0-.84.109-1.054a1 1 0 0 1 .437-.437C8.76 11.5 9.04 11.5 9.6 11.5Z"></path></svg></a></li><li><a href="/lead-management/leads" aria-label="Lead Management" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M16 18h6M15.5 3.29a4.001 4.001 0 0 1 0 7.42M12 15H8c-1.864 0-2.796 0-3.53.305a4 4 0 0 0-2.166 2.164C2 18.204 2 19.136 2 21M13.5 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"></path></svg></a></li><li><a href="/settings/mailer" aria-label="Settings" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M18.727 14.727a1.5 1.5 0 0 0 .3 1.655l.055.054a1.816 1.816 0 0 1 0 2.573 1.818 1.818 0 0 1-2.573 0l-.055-.055a1.5 1.5 0 0 0-1.654-.3 1.5 1.5 0 0 0-.91 1.373v.155a1.818 1.818 0 1 1-3.636 0V20.1a1.5 1.5 0 0 0-.981-1.373 1.5 1.5 0 0 0-1.655.3l-.054.055a1.818 1.818 0 0 1-3.106-1.287 1.818 1.818 0 0 1 .533-1.286l.054-.055a1.5 1.5 0 0 0 .3-1.654 1.5 1.5 0 0 0-1.372-.91h-.155a1.818 1.818 0 1 1 0-3.636H3.9a1.5 1.5 0 0 0 1.373-.981 1.5 1.5 0 0 0-.3-1.655l-.055-.054A1.818 1.818 0 1 1 7.491 4.99l.054.054a1.5 1.5 0 0 0 1.655.3h.073a1.5 1.5 0 0 0 .909-1.372v-.155a1.818 1.818 0 0 1 3.636 0V3.9a1.499 1.499 0 0 0 .91 1.373 1.5 1.5 0 0 0 1.654-.3l.054-.055a1.817 1.817 0 0 1 2.573 0 1.819 1.819 0 0 1 0 2.573l-.055.054a1.5 1.5 0 0 0-.3 1.655v.073a1.5 1.5 0 0 0 1.373.909h.155a1.818 1.818 0 0 1 0 3.636H20.1a1.499 1.499 0 0 0-1.373.91Z"></path></svg></a></li></ul><div class="mt-auto flex flex-col gap-4 py-5"><ul class="flex flex-col gap-0.5 px-3" data-menu-list="true"><li><a href="/settings/user" aria-label="Settings" class="relative flex cursor-pointer items-center justify-center rounded-md bg-primary p-2 text-fg-quaternary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover hover:text-fg-quaternary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 size-10" data-react-aria-pressable="true" tabindex="0"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="shrink-0 transition-inherit-all size-5"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path><path d="M18.727 14.727a1.5 1.5 0 0 0 .3 1.655l.055.054a1.816 1.816 0 0 1 0 2.573 1.818 1.818 0 0 1-2.573 0l-.055-.055a1.5 1.5 0 0 0-1.654-.3 1.5 1.5 0 0 0-.91 1.373v.155a1.818 1.818 0 1 1-3.636 0V20.1a1.5 1.5 0 0 0-.981-1.373 1.5 1.5 0 0 0-1.655.3l-.054.055a1.818 1.818 0 0 1-3.106-1.287 1.818 1.818 0 0 1 .533-1.286l.054-.055a1.5 1.5 0 0 0 .3-1.654 1.5 1.5 0 0 0-1.372-.91h-.155a1.818 1.818 0 1 1 0-3.636H3.9a1.5 1.5 0 0 0 1.373-.981 1.5 1.5 0 0 0-.3-1.655l-.055-.054A1.818 1.818 0 1 1 7.491 4.99l.054.054a1.5 1.5 0 0 0 1.655.3h.073a1.5 1.5 0 0 0 .909-1.372v-.155a1.818 1.818 0 0 1 3.636 0V3.9a1.499 1.499 0 0 0 .91 1.373 1.5 1.5 0 0 0 1.654-.3l.054-.055a1.817 1.817 0 0 1 2.573 0 1.819 1.819 0 0 1 0 2.573l-.055.054a1.5 1.5 0 0 0-.3 1.655v.073a1.5 1.5 0 0 0 1.373.909h.155a1.818 1.818 0 0 1 0 3.636H20.1a1.499 1.499 0 0 0-1.373.91Z"></path></svg></a></li></ul><div class="px-3"><button class="group relative inline-flex rounded-full" data-rac="" type="button" tabindex="0" aria-expanded="false" id="react-aria3594677181-_r_m_" data-react-aria-pressable="true"><div data-avatar="true" class="relative inline-flex shrink-0 items-center justify-center rounded-full bg-avatar-bg outline-avatar-contrast-border size-10 outline-1 -outline-offset-1"><img data-avatar-img="true" class="size-full rounded-full object-cover" alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&amp;q=80"><span class="absolute right-0 bottom-0 rounded-full ring-[1.5px] ring-bg-primary bg-fg-success-secondary size-2.5"></span></div></button></div></div></div></aside></div><div class="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block" style="padding-left: 68px;"></div><main class="flex-1 p-4"><div style="width: 1580px;"><div class="rounded-xl bg-primary shadow-xs ring-1 ring-secondary"><div class="relative flex flex-col items-start gap-4 border-b border-secondary bg-primary px-4 md:flex-row py-5 md:px-6"><div class="flex flex-1 flex-col gap-0.5"><div class="flex items-center gap-2"><h2 class="font-semibold text-primary text-lg">Quotations</h2><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-brand-50 text-utility-brand-700 ring-utility-brand-200">6458</span></div></div><template data-react-aria-hidden="true"></template><div class="flex flex-col gap-1.5 w-40" data-rac=""><button id="react-aria3594677181-_r_r_" class="relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Rows per page" aria-labelledby="react-aria3594677181-_r_10_ react-aria3594677181-_r_r_" aria-haspopup="listbox" aria-expanded="false"><span id="react-aria3594677181-_r_10_" class="flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled py-2 px-3" data-rac=""><section class="flex w-full gap-2 truncate"><p class="truncate text-md font-medium text-primary">10 / page</p></section><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-auto shrink-0 text-fg-quaternary size-4 stroke-[2.5px]"><path d="m6 9 6 6 6-6"></path></svg></span></button><div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-select-container" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; width: 1px; white-space: nowrap; top: 0px; left: 0px;"><label><select tabindex="-1" title=""><option></option><option value="10">10 / page</option><option value="25">25 / page</option><option value="50">50 / page</option></select></label></div></div></div><div class="grid grid-cols-1 gap-3 border-b border-secondary bg-primary px-4 py-4 md:grid-cols-2 md:px-6 lg:grid-cols-4 xl:grid-cols-5"><div data-input-wrapper="true" class="group flex h-max w-full flex-col items-start justify-start gap-1.5" data-rac=""><div role="presentation" class="relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-[var(--color-bg-primary)] shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled group-invalid:ring-error_subtle" data-rac=""><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="pointer-events-none absolute size-5 text-fg-quaternary left-3"><path d="m21 21-3.5-3.5m2.5-6a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"></path></svg><input aria-label="Search client, email, mobile..." placeholder="Search client, email, mobile..." tabindex="0" id="react-aria3594677181-_r_13_" class="m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary px-3 py-2 pl-10" data-rac="" type="text" value="" title=""></div></div><template data-react-aria-hidden="true"></template><div class="flex flex-col gap-1.5" data-rac=""><button id="react-aria3594677181-_r_1a_" class="relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-labelledby="react-aria3594677181-_r_1f_" aria-haspopup="listbox" aria-expanded="false"><span id="react-aria3594677181-_r_1f_" class="flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled py-2 px-3" data-rac=""><section class="flex w-full gap-2 truncate"><p class="truncate text-md font-medium text-primary">All Status</p></section><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-auto shrink-0 text-fg-quaternary size-4 stroke-[2.5px]"><path d="m6 9 6 6 6-6"></path></svg></span></button><div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-select-container" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; width: 1px; white-space: nowrap; top: 0px; left: 0px;"><label><select tabindex="-1" name="status" title=""><option></option><option value="">All Status</option><option value="true">Active</option><option value="false">Inactive</option></select></label></div></div><template data-react-aria-hidden="true"></template><div class="flex flex-col gap-1.5" data-rac=""><button id="react-aria3594677181-_r_1k_" class="relative flex w-full cursor-pointer items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary outline-hidden transition duration-100 ease-linear ring-inset" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-labelledby="react-aria3594677181-_r_1p_" aria-haspopup="listbox" aria-expanded="false"><span id="react-aria3594677181-_r_1p_" class="flex h-max w-full items-center justify-start gap-2 truncate text-left align-middle *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:text-fg-quaternary in-disabled:*:data-icon:text-fg-disabled py-2 px-3" data-rac=""><section class="flex w-full gap-2 truncate"><p class="truncate text-md font-medium text-primary">All Executives</p></section><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="ml-auto shrink-0 text-fg-quaternary size-4 stroke-[2.5px]"><path d="m6 9 6 6 6-6"></path></svg></span></button><div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-select-container" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; width: 1px; white-space: nowrap; top: 0px; left: 0px;"><label><select tabindex="-1" name="salesExecutive" title=""><option></option><option value="">All Executives</option><option value="690ae7e55de916ce5c1bdeea">SHALINI</option><option value="690588325de916ce5c1bdcb7">AKRATI</option><option value="6847fc7a5de916ce5c1bbf41">RICHA YADAV</option><option value="68106a1cc920ff60140bf305">VANSHIKA</option><option value="67c546d9dc0d696ec4e870b8">MEENAKSHI</option><option value="67b470b7e19b45df95d5adc3">Sudhanshu Singh Pal</option><option value="6757d5853005611b722e6d55">PRIYANKA</option><option value="67502276d6685193a8447348">RUBEENA</option><option value="675021ead6685193a8447342">NAJRIN</option><option value="675021a2d6685193a8447341">PRIYA YADAV</option><option value="675020d0d6685193a844733f">RIJVANA</option><option value="67501fc1d6685193a844733d">Roshni</option><option value="674f4b87bd3d96a42552f4fe">Akshanshu</option><option value="674f42ad27a4eb7981d4dfb0">akshanshu pal</option></select></label></div></div><div class="react-aria-DatePicker" data-rac=""><div data-react-aria-pressable="true" id="react-aria3594677181-_r_1v_" aria-labelledby="react-aria3594677181-_r_1v_" role="group" class="w-full" data-rac=""><button id="react-aria3594677181-_r_1s_" class="group relative inline-flex h-max cursor-pointer items-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:*:data-icon:text-fg-disabled_subtle *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5 in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3 bg-primary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover w-full justify-start text-fg-quaternary" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Calendar" aria-labelledby="react-aria3594677181-_r_1s_ react-aria3594677181-_r_1v_" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="leading" class="pointer-events-none size-5 shrink-0 transition-inherit-all"><path d="M21 10H3m13-8v4M8 2v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 19.72 21 18.88 21 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 6.28 3 7.12 3 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 22 6.12 22 7.8 22Z"></path></svg><span data-text="true" class="transition-inherit-all px-0.5">Created Date</span></button></div></div><div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-dateinput-container" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; width: 1px; white-space: nowrap; top: 0px; left: 0px;"><input tabindex="-1" form="" step="60" type="date" value=""></div><div class="flex gap-2"><div class="flex-1" data-rac=""><div data-react-aria-pressable="true" id="react-aria3594677181-_r_29_" aria-labelledby="react-aria3594677181-_r_29_" role="group" class="w-full" data-rac=""><button id="react-aria3594677181-_r_26_" class="group relative inline-flex h-max cursor-pointer items-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:*:data-icon:text-fg-disabled_subtle *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5 in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3 bg-primary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover w-full justify-start text-fg-quaternary" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Calendar" aria-labelledby="react-aria3594677181-_r_26_ react-aria3594677181-_r_29_" aria-haspopup="dialog" aria-expanded="false"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="leading" class="pointer-events-none size-5 shrink-0 transition-inherit-all"><path d="M21 10H3m13-8v4M8 2v4m-.2 16h8.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C21 19.72 21 18.88 21 17.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C18.72 4 17.88 4 16.2 4H7.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C3 6.28 3 7.12 3 8.8v8.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C5.28 22 6.12 22 7.8 22Z"></path></svg><span data-text="true" class="transition-inherit-all px-0.5">Travel Date</span></button></div></div><div aria-hidden="true" data-react-aria-prevent-focus="true" data-a11y-ignore="aria-hidden-focus" data-testid="hidden-dateinput-container" style="border: 0px; clip: rect(0px, 0px, 0px, 0px); clip-path: inset(50%); height: 1px; margin: -1px; overflow: hidden; padding: 0px; position: fixed; width: 1px; white-space: nowrap; top: 0px; left: 0px;"><input tabindex="-1" form="" step="60" type="date" value=""></div><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-fg-quaternary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-fg-quaternary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5 px-3" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Reset Filters" id="react-aria3594677181-_r_2h_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M21 10s-2.005-2.732-3.634-4.362a9 9 0 1 0 2.282 8.862M21 10V4m0 6h-6"></path></svg></button></div></div><div class="w-full"><div class="overflow-y-visible overflow-x-auto lg:overflow-x-visible"><template data-react-aria-hidden="true"></template><span data-focus-scope-start="true" hidden=""></span><table class="w-full" data-rac="" id="react-aria3594677181-_r_2j_" role="grid" tabindex="-1" aria-describedby="" data-collection="react-aria3594677181-_r_2k_"><thead role="rowgroup" class="sticky top-0 z-30 bg-secondary h-11 [&amp;&gt;tr&gt;th]:after:pointer-events-none [&amp;&gt;tr&gt;th]:after:absolute [&amp;&gt;tr&gt;th]:after:inset-x-0 [&amp;&gt;tr&gt;th]:after:bottom-0 [&amp;&gt;tr&gt;th]:after:h-px [&amp;&gt;tr&gt;th]:after:bg-border-secondary [&amp;&gt;tr&gt;th]:focus-visible:after:bg-transparent" data-rac=""><tr role="row"><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-1" id="react-aria3594677181-_r_2j_-react-aria-1" role="columnheader" aria-colindex="1" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1">#</div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-2" id="react-aria3594677181-_r_2j_-react-aria-2" role="columnheader" aria-colindex="2" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Client Details</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-3" id="react-aria3594677181-_r_2j_-react-aria-3" role="columnheader" aria-colindex="3" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Sales Executive</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-4" id="react-aria3594677181-_r_2j_-react-aria-4" role="columnheader" aria-colindex="4" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Created Date</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-5" id="react-aria3594677181-_r_2j_-react-aria-5" role="columnheader" aria-colindex="5" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Travel Date</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-6" id="react-aria3594677181-_r_2j_-react-aria-6" role="columnheader" aria-colindex="6" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Cost</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-7" id="react-aria3594677181-_r_2j_-react-aria-7" role="columnheader" aria-colindex="7" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Status</span></div></div></th><th tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-8" id="react-aria3594677181-_r_2j_-react-aria-8" role="columnheader" aria-colindex="8" data-react-aria-pressable="true" class="sticky top-0 z-20 bg-secondary p-0 px-6 py-2 outline-hidden focus-visible:z-1 focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-bg-primary focus-visible:ring-inset" data-rac=""><div class="flex items-center gap-1" data-rac="" role="group"><div class="flex items-center gap-1"><span class="text-xs font-semibold whitespace-nowrap text-quaternary">Actions</span></div></div></th></tr></thead><tbody class="react-aria-TableBody" data-rac="" role="rowgroup"><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-109" id="react-aria3594677181-_r_62_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-101" id="react-aria3594677181-_r_64_" role="gridcell">1</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-102" id="react-aria3594677181-_r_65_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69745d68cd9d6d75e8c6032f" target="_blank" data-discover="true">Mrs Rupal</a><div class="text-sm text-gray-500">8700744662</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-103" id="react-aria3594677181-_r_66_" role="gridcell">VANSHIKA</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-104" id="react-aria3594677181-_r_67_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">11:19:28 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-105" id="react-aria3594677181-_r_68_" role="gridcell">Jan 25, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-106" id="react-aria3594677181-_r_69_" role="gridcell">₹ 15000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-107" id="react-aria3594677181-_r_6a_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="0" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-108" id="react-aria3594677181-_r_6b_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69745d68cd9d6d75e8c6032f" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_6e_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_6h_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_6k_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_6n_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-118" id="react-aria3594677181-_r_6p_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-110" id="react-aria3594677181-_r_6r_" role="gridcell">2</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-111" id="react-aria3594677181-_r_6s_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/6974571dcd9d6d75e8c6032d" target="_blank" data-discover="true">Ms Simpu </a><div class="text-sm text-gray-500">9991863911</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-112" id="react-aria3594677181-_r_6t_" role="gridcell">PRIYA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-113" id="react-aria3594677181-_r_6u_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:52:37 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-114" id="react-aria3594677181-_r_6v_" role="gridcell">Mar 10, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-115" id="react-aria3594677181-_r_70_" role="gridcell">₹ 32000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-116" id="react-aria3594677181-_r_71_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-117" id="react-aria3594677181-_r_72_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/6974571dcd9d6d75e8c6032d" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_75_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_78_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_7b_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_7e_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-127" id="react-aria3594677181-_r_7g_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-119" id="react-aria3594677181-_r_7i_" role="gridcell">3</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-120" id="react-aria3594677181-_r_7j_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69745622cd9d6d75e8c6032b" target="_blank" data-discover="true">Habul Chakraborty</a><div class="text-sm text-gray-500">9238392977</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-121" id="react-aria3594677181-_r_7k_" role="gridcell">VANSHIKA</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-122" id="react-aria3594677181-_r_7l_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:48:26 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-123" id="react-aria3594677181-_r_7m_" role="gridcell">Mar 18, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-124" id="react-aria3594677181-_r_7n_" role="gridcell">₹ 11000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-125" id="react-aria3594677181-_r_7o_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-126" id="react-aria3594677181-_r_7p_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69745622cd9d6d75e8c6032b" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_7s_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_7v_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_82_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_85_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-136" id="react-aria3594677181-_r_87_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-128" id="react-aria3594677181-_r_89_" role="gridcell">4</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-129" id="react-aria3594677181-_r_8a_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69745559cd9d6d75e8c60329" target="_blank" data-discover="true">Ms Aparna</a><div class="text-sm text-gray-500">9819201582</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-130" id="react-aria3594677181-_r_8b_" role="gridcell">PRIYA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-131" id="react-aria3594677181-_r_8c_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:45:05 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-132" id="react-aria3594677181-_r_8d_" role="gridcell">Mar 20, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-133" id="react-aria3594677181-_r_8e_" role="gridcell">₹ 55500</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-134" id="react-aria3594677181-_r_8f_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-135" id="react-aria3594677181-_r_8g_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69745559cd9d6d75e8c60329" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_8j_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_8m_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_8p_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_8s_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-145" id="react-aria3594677181-_r_8u_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-137" id="react-aria3594677181-_r_90_" role="gridcell">5</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-138" id="react-aria3594677181-_r_91_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/6974554ecd9d6d75e8c60328" target="_blank" data-discover="true">Sir</a><div class="text-sm text-gray-500">9611178808</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-139" id="react-aria3594677181-_r_92_" role="gridcell">RICHA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-140" id="react-aria3594677181-_r_93_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:44:54 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-141" id="react-aria3594677181-_r_94_" role="gridcell">Jan 24, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-142" id="react-aria3594677181-_r_95_" role="gridcell">₹ 25000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-143" id="react-aria3594677181-_r_96_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-144" id="react-aria3594677181-_r_97_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/6974554ecd9d6d75e8c60328" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_9a_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_9d_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_9g_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_9j_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-154" id="react-aria3594677181-_r_9l_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-146" id="react-aria3594677181-_r_9n_" role="gridcell">6</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-147" id="react-aria3594677181-_r_9o_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/6974554ccd9d6d75e8c60327" target="_blank" data-discover="true">Sir</a><div class="text-sm text-gray-500">9611178808</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-148" id="react-aria3594677181-_r_9p_" role="gridcell">RICHA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-149" id="react-aria3594677181-_r_9q_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:44:52 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-150" id="react-aria3594677181-_r_9r_" role="gridcell">Jan 24, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-151" id="react-aria3594677181-_r_9s_" role="gridcell">₹ 25000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-152" id="react-aria3594677181-_r_9t_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-153" id="react-aria3594677181-_r_9u_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/6974554ccd9d6d75e8c60327" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_a1_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_a4_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_a7_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_aa_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-163" id="react-aria3594677181-_r_ac_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-155" id="react-aria3594677181-_r_ae_" role="gridcell">7</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-156" id="react-aria3594677181-_r_af_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69745423cd9d6d75e8c60324" target="_blank" data-discover="true">Mr Deepak </a><div class="text-sm text-gray-500">8726187487</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-157" id="react-aria3594677181-_r_ag_" role="gridcell">PRIYA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-158" id="react-aria3594677181-_r_ah_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:39:55 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-159" id="react-aria3594677181-_r_ai_" role="gridcell">Jan 27, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-160" id="react-aria3594677181-_r_aj_" role="gridcell">₹ 23000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-161" id="react-aria3594677181-_r_ak_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-162" id="react-aria3594677181-_r_al_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69745423cd9d6d75e8c60324" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_ao_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_ar_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_au_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_b1_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-172" id="react-aria3594677181-_r_b3_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-164" id="react-aria3594677181-_r_b5_" role="gridcell">8</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-165" id="react-aria3594677181-_r_b6_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/6974541ecd9d6d75e8c60323" target="_blank" data-discover="true">Mr Mohan</a><div class="text-sm text-gray-500">9962838884</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-166" id="react-aria3594677181-_r_b7_" role="gridcell">RIJVANA</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-167" id="react-aria3594677181-_r_b8_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:39:50 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-168" id="react-aria3594677181-_r_b9_" role="gridcell">Feb 20, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-169" id="react-aria3594677181-_r_ba_" role="gridcell">₹ 25500</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-170" id="react-aria3594677181-_r_bb_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-171" id="react-aria3594677181-_r_bc_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/6974541ecd9d6d75e8c60323" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_bf_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_bi_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_bl_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_bo_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-181" id="react-aria3594677181-_r_bq_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-173" id="react-aria3594677181-_r_bs_" role="gridcell">9</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-174" id="react-aria3594677181-_r_bt_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69745188cd9d6d75e8c60320" target="_blank" data-discover="true">Mr Deepak </a><div class="text-sm text-gray-500">8726187487</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-175" id="react-aria3594677181-_r_bu_" role="gridcell">PRIYA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-176" id="react-aria3594677181-_r_bv_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:28:48 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-177" id="react-aria3594677181-_r_c0_" role="gridcell">Jan 27, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-178" id="react-aria3594677181-_r_c1_" role="gridcell">₹ 23000</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-179" id="react-aria3594677181-_r_c2_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-180" id="react-aria3594677181-_r_c3_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69745188cd9d6d75e8c60320" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_c6_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_c9_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_cc_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_cf_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr><tr class="relative outline-focus-ring transition-colors after:pointer-events-none hover:bg-secondary focus-visible:outline-2 focus-visible:-outline-offset-2 h-18 selected:bg-secondary [&amp;&gt;td]:after:absolute [&amp;&gt;td]:after:inset-x-0 [&amp;&gt;td]:after:bottom-0 [&amp;&gt;td]:after:h-px [&amp;&gt;td]:after:w-full [&amp;&gt;td]:after:bg-border-secondary last:[&amp;&gt;td]:after:hidden [&amp;&gt;td]:focus-visible:after:opacity-0 focus-visible:[&amp;&gt;td]:after:opacity-0" data-rac="" role="row" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-190" id="react-aria3594677181-_r_ch_" aria-labelledby=""><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-182" id="react-aria3594677181-_r_cj_" role="gridcell">10</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-183" id="react-aria3594677181-_r_ck_" role="gridcell"><div><a class="font-medium text-brand-600 hover:underline" href="/package-mail/69744b1ccd9d6d75e8c6031e" target="_blank" data-discover="true">Ms Benjamin</a><div class="text-sm text-gray-500">9392220995</div><div class="text-sm text-gray-500"></div></div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-184" id="react-aria3594677181-_r_cl_" role="gridcell">PRIYA YADAV</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-185" id="react-aria3594677181-_r_cm_" role="gridcell">Jan 24, 2026<div class="text-xs text-gray-400">10:01:24 AM</div></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-186" id="react-aria3594677181-_r_cn_" role="gridcell">Mar 26, 2026</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-187" id="react-aria3594677181-_r_co_" role="gridcell">₹ 40800</td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-188" id="react-aria3594677181-_r_cp_" role="gridcell"><span class="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset py-0.5 px-2 text-xs font-medium bg-utility-success-50 text-utility-success-700 ring-utility-success-200">Active</span></td><td class="relative text-sm text-tertiary outline-focus-ring focus-visible:z-1 focus-visible:outline-2 focus-visible:-outline-offset-2 px-6 py-4" data-rac="" tabindex="-1" data-collection="react-aria3594677181-_r_2k_" data-key="react-aria-189" id="react-aria3594677181-_r_cq_" role="gridcell"><div class="flex items-center gap-2"><a class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" aria-label="View" href="/package-mail/69744b1ccd9d6d75e8c6031e" target="_blank" rel="noreferrer" tabindex="0" data-react-aria-pressable="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.42 12.713c-.136-.215-.204-.323-.242-.49a1.173 1.173 0 0 1 0-.446c.038-.167.106-.274.242-.49C3.546 9.505 6.895 5 12 5s8.455 4.505 9.58 6.287c.137.215.205.323.243.49.029.125.029.322 0 .446-.038.167-.106.274-.242.49C20.455 14.495 17.105 19 12 19c-5.106 0-8.455-4.505-9.58-6.287Z"></path><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path></svg></a><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-warning-primary ring-1 ring-utility-warning-200 ring-inset hover:bg-warning-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Edit" id="react-aria3594677181-_r_ct_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M2.876 18.116c.046-.414.069-.62.131-.814a2 2 0 0 1 .234-.485c.111-.17.259-.317.553-.61L17 3a2.828 2.828 0 1 1 4 4L7.794 20.206c-.294.294-.442.442-.611.553a2 2 0 0 1-.485.233c-.193.063-.4.086-.814.132L2.5 21.5l.376-3.384Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-error-primary ring-1 ring-error_subtle ring-inset hover:bg-error-primary hover:text-error-primary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Delete" id="react-aria3594677181-_r_d0_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M16 6v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C14.48 2 13.92 2 12.8 2h-1.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C8 3.52 8 4.08 8 5.2V6m2 5.5v5m4-5v5M3 6h18m-2 0v11.2c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C16.72 22 15.88 22 14.2 22H9.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C5 19.72 5 18.88 5 17.2V6"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-brand-secondary ring-1 ring-brand_alt ring-inset hover:bg-brand-primary_alt hover:text-brand-secondary_hover disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Send Mail" id="react-aria3594677181-_r_d3_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="m2 7 8.165 5.715c.661.463.992.695 1.351.784a2 2 0 0 0 .968 0c.36-.09.69-.32 1.351-.784L22 7M6.8 20h10.4c1.68 0 2.52 0 3.162-.327a3 3 0 0 0 1.311-1.311C22 17.72 22 16.88 22 15.2V8.8c0-1.68 0-2.52-.327-3.162a3 3 0 0 0-1.311-1.311C19.72 4 18.88 4 17.2 4H6.8c-1.68 0-2.52 0-3.162.327a3 3 0 0 0-1.311 1.311C2 6.28 2 7.12 2 8.8v6.4c0 1.68 0 2.52.327 3.162a3 3 0 0 0 1.311 1.311C4.28 20 5.12 20 6.8 20Z"></path></svg></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center rounded-md p-1.5 outline-focus-ring transition duration-100 ease-linear hover:shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:text-fg-disabled_subtle bg-primary text-success-primary ring-1 ring-utility-success-200 ring-inset hover:bg-success-primary disabled:ring-disabled_subtle *:data-icon:pointer-events-none *:data-icon:shrink-0 *:data-icon:text-current *:data-icon:transition-inherit-all *:data-icon:size-5" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Create Assignment" id="react-aria3594677181-_r_d6_"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" data-icon="true"><path d="M14 11H8m2 4H8m8-8H8m12-.2v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 0 1-1.311 1.311C17.72 22 16.88 22 15.2 22H8.8c-1.68 0-2.52 0-3.162-.327a3 3 0 0 1-1.311-1.311C4 19.72 4 18.88 4 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 0 1 1.311-1.311C6.28 2 7.12 2 8.8 2h6.4c1.68 0 2.52 0 3.162.327a3 3 0 0 1 1.311 1.311C20 4.28 20 5.12 20 6.8Z"></path></svg></button></div></td></tr></tbody></table><span data-focus-scope-end="true" hidden=""></span></div><div class="flex border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4 justify-center"><nav aria-label="Pagination Navigation"><div class="relative z-0 inline-flex w-max -space-x-px rounded-lg shadow-xs" data-rac="" role="radiogroup" aria-orientation="horizontal" data-orientation="horizontal"><button data-icon-leading="true" class="group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3" data-rac="" type="button" disabled="" data-react-aria-pressable="true" aria-label="Previous Page" aria-pressed="false" data-disabled="true"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="pointer-events-none text-fg-quaternary transition-[inherit] group-hover/button-group:text-fg-quaternary_hover group-disabled/button-group:text-fg-disabled_subtle size-5"><path d="M19 12H5m0 0 7 7m-7-7 7-7"></path></svg>Previous</button><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 1" aria-pressed="true" aria-current="page" data-selected="true">1</button><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 2" aria-pressed="false">2</button><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 3" aria-pressed="false">3</button><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 4" aria-pressed="false">4</button><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 5" aria-pressed="false">5</button><span aria-hidden="true"><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 pointer-events-none size-10 items-center justify-center rounded-none!" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-pressed="false">…</button></span><button class="group/button-group inline-flex cursor-pointer bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3 size-10 items-center justify-center data-[selected]:bg-brand-primary_alt data-[selected]:text-brand-secondary data-[selected]:ring-1 data-[selected]:ring-brand_alt data-[selected]:shadow-xs data-[selected]:font-semibold" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" aria-label="Page 646" aria-pressed="false">646</button><button class="group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3" data-rac="" type="button" data-react-aria-pressable="true" aria-label="Next Page" aria-pressed="false" tabindex="0">Next<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="pointer-events-none text-fg-quaternary transition-[inherit] group-hover/button-group:text-fg-quaternary_hover group-disabled/button-group:text-fg-disabled_subtle size-5"><path d="M5 12h14m0 0-7-7m7 7-7 7"></path></svg></button></div></nav></div></div></div></div></main></div></div></div>
        <script type="module" src="/src/main.tsx?t=1769234299475" inert=""></script>
        <script inert="">
            // On page load or when changing themes, best to add inline in `head` to avoid FOUC
            if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                document.documentElement.classList.add("dark-mode");
            } else {
                document.documentElement.classList.remove("dark-mode");
            }
        </script>
    

<span data-focus-scope-start="true" hidden="" inert=""></span><div class="fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-overlay/70 px-4 pt-4 pb-[clamp(16px,8vh,64px)] outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:p-8 jodit_fullsize-box_true" data-rac="" style="--visual-viewport-height: 684px; --page-height: 684px;"><div class="max-h-full w-full align-middle outline-hidden max-sm:overflow-y-auto max-sm:rounded-xl max-w-4xl jodit_fullsize-box_true" data-rac=""><section class="flex w-full items-center justify-center outline-hidden jodit_fullsize-box_true" data-rac="" role="dialog" tabindex="-1"><div class="relative w-full rounded-xl border border-secondary bg-primary p-6 shadow-lg jodit_fullsize-box_true"><button type="button" class="absolute right-4 top-4 rounded-md p-1 text-tertiary hover:bg-secondary hover:text-primary transition" aria-label="Close dialog">X</button><div class="flex w-full flex-col gap-6 jodit_fullsize-box_true"><div class="flex w-full"><div class="relative z-0 inline-flex w-max -space-x-px rounded-lg shadow-xs" data-rac="" role="radiogroup" aria-orientation="horizontal" data-orientation="horizontal"><button class="group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" role="radio" aria-checked="true" data-selected="true">Send Mail</button><button class="group/button-group inline-flex h-max cursor-pointer items-center bg-primary font-semibold whitespace-nowrap text-secondary shadow-skeumorphic ring-1 ring-primary outline-brand transition duration-100 ease-linear ring-inset hover:bg-primary_hover hover:text-secondary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:bg-primary disabled:text-disabled selected:bg-active selected:text-secondary_hover selected:disabled:bg-disabled_subtle gap-1.5 px-4 py-2.5 text-sm not-last:pr-[calc(calc(var(--spacing)*4)+1px)] first:rounded-l-lg last:rounded-r-lg data-icon-leading:pl-3.5 data-icon-only:px-3" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" role="radio" aria-checked="false">Mail History</button></div></div><div class="flex flex-col gap-4 jodit_fullsize-box_true"><div class="flex flex-col h-full w-full space-y-4 jodit_fullsize-box_true"><div class="flex justify-between items-center pb-4 border-b border-secondary"><h3 class="text-lg font-semibold text-primary">Email Preview</h3><div><button class="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:*:data-icon:text-fg-disabled_subtle *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3 py-2 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2 in-data-input-wrapper:px-3.5 in-data-input-wrapper:py-2.5 in-data-input-wrapper:data-icon-only:p-2.5 bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" id="react-aria3594677181-_r_di_"><span data-text="true" class="transition-inherit-all px-0.5">Back to Email</span></button><button class="group relative inline-flex h-max cursor-pointer items-center justify-center whitespace-nowrap outline-brand transition duration-100 ease-linear before:absolute focus-visible:outline-2 focus-visible:outline-offset-2 in-data-input-wrapper:shadow-xs in-data-input-wrapper:focus:!z-50 in-data-input-wrapper:in-data-leading:-mr-px in-data-input-wrapper:in-data-leading:rounded-r-none in-data-input-wrapper:in-data-leading:before:rounded-r-none in-data-input-wrapper:in-data-trailing:-ml-px in-data-input-wrapper:in-data-trailing:rounded-l-none in-data-input-wrapper:in-data-trailing:before:rounded-l-none disabled:cursor-not-allowed disabled:text-fg-disabled disabled:*:data-icon:text-fg-disabled_subtle *:data-icon:pointer-events-none *:data-icon:size-5 *:data-icon:shrink-0 *:data-icon:transition-inherit-all gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold before:rounded-[7px] data-icon-only:p-2.5 in-data-input-wrapper:gap-1.5 in-data-input-wrapper:px-4 in-data-input-wrapper:text-md in-data-input-wrapper:data-icon-only:p-3 bg-primary text-secondary shadow-xs-skeumorphic ring-1 ring-primary ring-inset hover:bg-primary_hover hover:text-secondary_hover data-loading:bg-primary_hover disabled:shadow-xs disabled:ring-disabled_subtle *:data-icon:text-fg-quaternary hover:*:data-icon:text-fg-quaternary_hover" data-rac="" type="button" tabindex="0" data-react-aria-pressable="true" id="react-aria3594677181-_r_dk_"><span data-text="true" class="transition-inherit-all px-0.5">Send Mail</span></button></div></div><div class="flex-1 flex flex-col gap-4 jodit_fullsize-box_true"><div data-input-wrapper="true" class="group flex h-max w-full flex-col items-start justify-start gap-1.5" data-rac=""><label class="flex cursor-default items-center gap-0.5 text-sm font-medium text-secondary" id="react-aria3594677181-_r_dn_" for="subject" data-label="true">Subject<span class="hidden text-brand-tertiary">*</span></label><div role="presentation" class="relative flex w-full flex-row place-content-center place-items-center rounded-lg bg-[var(--color-bg-primary)] shadow-xs ring-1 ring-primary transition-shadow duration-100 ease-linear ring-inset group-disabled:cursor-not-allowed group-disabled:bg-disabled_subtle group-disabled:ring-disabled group-invalid:ring-error_subtle" data-rac=""><input id="subject" placeholder="Enter subject" tabindex="0" aria-labelledby="react-aria3594677181-_r_dn_" class="m-0 w-full bg-transparent text-md text-primary ring-0 outline-hidden placeholder:text-placeholder autofill:rounded-lg autofill:text-primary px-3 py-2" data-rac="" type="text" value="Tripzipper Itinerary for Domestic Package -Ms VANSHIKA-9599008756-2026-01-25" name="subject" title=""></div></div><div class="flex-1 rounded-md border border-secondary overflow-scroll jodit_fullsize-box_true"><div class="tz-rich-text-editor h-[400px] jodit_fullsize-box_true"><div class="jodit-react-container jodit_fullsize-box_true"><div class="jodit-container jodit jodit_theme_default jodit-wysiwyg_mode jodit-jodit_fullsize_true jodit_fullsize" contenteditable="false" style="min-height: 200px; min-width: 200px; max-width: 100%; height: 684px; width: 1680px;"><div class="jodit-toolbar__box"><div class="jodit-toolbar-editor-collection jodit-toolbar-editor-collection_mode_horizontal jodit-toolbar-editor-collection_size_middle" style="width: auto;"><input tab-index="-1" disabled="true" style="width: 0; height:0; position: absolute; visibility: hidden;"><div class="jodit-ui-group jodit-ui-group_line_true jodit-ui-group_size_middle"><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_font-style jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_bold jodit-ui-group__bold" role="listitem" data-ref="bold" ref="bold" aria-label="Bold"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_bold jodit-icon"> <path d="M747 1521q74 32 140 32 376 0 376-335 0-114-41-180-27-44-61.5-74t-67.5-46.5-80.5-25-84-10.5-94.5-2q-73 0-101 10 0 53-.5 159t-.5 158q0 8-1 67.5t-.5 96.5 4.5 83.5 12 66.5zm-14-746q42 7 109 7 82 0 143-13t110-44.5 74.5-89.5 25.5-142q0-70-29-122.5t-79-82-108-43.5-124-14q-50 0-130 13 0 50 4 151t4 152q0 27-.5 80t-.5 79q0 46 1 69zm-541 889l2-94q15-4 85-16t106-27q7-12 12.5-27t8.5-33.5 5.5-32.5 3-37.5.5-34v-65.5q0-982-22-1025-4-8-22-14.5t-44.5-11-49.5-7-48.5-4.5-30.5-3l-4-83q98-2 340-11.5t373-9.5q23 0 68.5.5t67.5.5q70 0 136.5 13t128.5 42 108 71 74 104.5 28 137.5q0 52-16.5 95.5t-39 72-64.5 57.5-73 45-84 40q154 35 256.5 134t102.5 248q0 100-35 179.5t-93.5 130.5-138 85.5-163.5 48.5-176 14q-44 0-132-3t-132-3q-106 0-307 11t-231 12z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_italic jodit-ui-group__italic" role="listitem" data-ref="italic" ref="italic" aria-label="Italic"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_italic jodit-icon"> <path d="M384 1662l17-85q6-2 81.5-21.5t111.5-37.5q28-35 41-101 1-7 62-289t114-543.5 52-296.5v-25q-24-13-54.5-18.5t-69.5-8-58-5.5l19-103q33 2 120 6.5t149.5 7 120.5 2.5q48 0 98.5-2.5t121-7 98.5-6.5q-5 39-19 89-30 10-101.5 28.5t-108.5 33.5q-8 19-14 42.5t-9 40-7.5 45.5-6.5 42q-27 148-87.5 419.5t-77.5 355.5q-2 9-13 58t-20 90-16 83.5-6 57.5l1 18q17 4 185 31-3 44-16 99-11 0-32.5 1.5t-32.5 1.5q-29 0-87-10t-86-10q-138-2-206-2-51 0-143 9t-121 11z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_underline jodit-ui-group__underline" role="listitem" data-ref="underline" ref="underline" aria-label="Underline"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_underline jodit-icon"> <path d="M176 223q-37-2-45-4l-3-88q13-1 40-1 60 0 112 4 132 7 166 7 86 0 168-3 116-4 146-5 56 0 86-2l-1 14 2 64v9q-60 9-124 9-60 0-79 25-13 14-13 132 0 13 .5 32.5t.5 25.5l1 229 14 280q6 124 51 202 35 59 96 92 88 47 177 47 104 0 191-28 56-18 99-51 48-36 65-64 36-56 53-114 21-73 21-229 0-79-3.5-128t-11-122.5-13.5-159.5l-4-59q-5-67-24-88-34-35-77-34l-100 2-14-3 2-86h84l205 10q76 3 196-10l18 2q6 38 6 51 0 7-4 31-45 12-84 13-73 11-79 17-15 15-15 41 0 7 1.5 27t1.5 31q8 19 22 396 6 195-15 304-15 76-41 122-38 65-112 123-75 57-182 89-109 33-255 33-167 0-284-46-119-47-179-122-61-76-83-195-16-80-16-237v-333q0-188-17-213-25-36-147-39zm1488 1409v-64q0-14-9-23t-23-9h-1472q-14 0-23 9t-9 23v64q0 14 9 23t23 9h1472q14 0 23-9t9-23z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_strikethrough jodit-ui-group__strikethrough" role="listitem" data-ref="strikethrough" ref="strikethrough" aria-label="Strike through"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_strikethrough jodit-icon"> <path d="M1760 896q14 0 23 9t9 23v64q0 14-9 23t-23 9h-1728q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h1728zm-1277-64q-28-35-51-80-48-97-48-188 0-181 134-309 133-127 393-127 50 0 167 19 66 12 177 48 10 38 21 118 14 123 14 183 0 18-5 45l-12 3-84-6-14-2q-50-149-103-205-88-91-210-91-114 0-182 59-67 58-67 146 0 73 66 140t279 129q69 20 173 66 58 28 95 52h-743zm507 256h411q7 39 7 92 0 111-41 212-23 55-71 104-37 35-109 81-80 48-153 66-80 21-203 21-114 0-195-23l-140-40q-57-16-72-28-8-8-8-22v-13q0-108-2-156-1-30 0-68l2-37v-44l102-2q15 34 30 71t22.5 56 12.5 27q35 57 80 94 43 36 105 57 59 22 132 22 64 0 139-27 77-26 122-86 47-61 47-129 0-84-81-157-34-29-137-71z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_eraser jodit-ui-group__eraser" role="listitem" data-ref="eraser" ref="eraser" aria-label="Clear Formatting"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_eraser jodit-icon"> <path d="M832 1408l336-384h-768l-336 384h768zm1013-1077q15 34 9.5 71.5t-30.5 65.5l-896 1024q-38 44-96 44h-768q-38 0-69.5-20.5t-47.5-54.5q-15-34-9.5-71.5t30.5-65.5l896-1024q38-44 96-44h768q38 0 69.5 20.5t47.5 54.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_list jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_ul jodit-toolbar-button_with-trigger_true jodit-ui-group__ul" role="listitem" data-ref="ul" ref="ul" aria-label="Insert Unordered List"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_ul jodit-icon"> <path stroke-width="0" d="M384 1408q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm0-512q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm-1408-928q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1408 416v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_ol jodit-toolbar-button_with-trigger_true jodit-ui-group__ol" role="listitem" data-ref="ol" ref="ol" aria-label="Insert Ordered List"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_ol jodit-icon"> <path stroke-width="0" d="M381 1620q0 80-54.5 126t-135.5 46q-106 0-172-66l57-88q49 45 106 45 29 0 50.5-14.5t21.5-42.5q0-64-105-56l-26-56q8-10 32.5-43.5t42.5-54 37-38.5v-1q-16 0-48.5 1t-48.5 1v53h-106v-152h333v88l-95 115q51 12 81 49t30 88zm2-627v159h-362q-6-36-6-54 0-51 23.5-93t56.5-68 66-47.5 56.5-43.5 23.5-45q0-25-14.5-38.5t-39.5-13.5q-46 0-81 58l-85-59q24-51 71.5-79.5t105.5-28.5q73 0 123 41.5t50 112.5q0 50-34 91.5t-75 64.5-75.5 50.5-35.5 52.5h127v-60h105zm1409 319v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm-1408-899v99h-335v-99h107q0-41 .5-122t.5-121v-12h-2q-8 17-50 54l-71-76 136-127h106v404h108zm1408 387v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-14 9-23t23-9h1216q13 0 22.5 9.5t9.5 22.5zm0-512v192q0 13-9.5 22.5t-22.5 9.5h-1216q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1216q13 0 22.5 9.5t9.5 22.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_font jodit-ui-group_before-spacer_true jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_font jodit-toolbar-button_with-trigger_true jodit-ui-group__font" role="listitem" data-ref="font" ref="font" aria-label="Font family"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_font jodit-icon"> <path d="M789 559l-170 450q33 0 136.5 2t160.5 2q19 0 57-2-87-253-184-452zm-725 1105l2-79q23-7 56-12.5t57-10.5 49.5-14.5 44.5-29 31-50.5l237-616 280-724h128q8 14 11 21l205 480q33 78 106 257.5t114 274.5q15 34 58 144.5t72 168.5q20 45 35 57 19 15 88 29.5t84 20.5q6 38 6 57 0 4-.5 13t-.5 13q-63 0-190-8t-191-8q-76 0-215 7t-178 8q0-43 4-78l131-28q1 0 12.5-2.5t15.5-3.5 14.5-4.5 15-6.5 11-8 9-11 2.5-14q0-16-31-96.5t-72-177.5-42-100l-450-2q-26 58-76.5 195.5t-50.5 162.5q0 22 14 37.5t43.5 24.5 48.5 13.5 57 8.5 41 4q1 19 1 58 0 9-2 27-58 0-174.5-10t-174.5-10q-8 0-26.5 4t-21.5 4q-80 14-188 14z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_fontsize jodit-toolbar-button_with-trigger_true jodit-ui-group__fontsize" role="listitem" data-ref="fontsize" ref="fontsize" aria-label="Font size"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_fontsize jodit-icon"> <path d="M1744 1408q33 0 42 18.5t-11 44.5l-126 162q-20 26-49 26t-49-26l-126-162q-20-26-11-44.5t42-18.5h80v-1024h-80q-33 0-42-18.5t11-44.5l126-162q20-26 49-26t49 26l126 162q20 26 11 44.5t-42 18.5h-80v1024h80zm-1663-1279l54 27q12 5 211 5 44 0 132-2t132-2q36 0 107.5.5t107.5.5h293q6 0 21 .5t20.5 0 16-3 17.5-9 15-17.5l42-1q4 0 14 .5t14 .5q2 112 2 336 0 80-5 109-39 14-68 18-25-44-54-128-3-9-11-48t-14.5-73.5-7.5-35.5q-6-8-12-12.5t-15.5-6-13-2.5-18-.5-16.5.5q-17 0-66.5-.5t-74.5-.5-64 2-71 6q-9 81-8 136 0 94 2 388t2 455q0 16-2.5 71.5t0 91.5 12.5 69q40 21 124 42.5t120 37.5q5 40 5 50 0 14-3 29l-34 1q-76 2-218-8t-207-10q-50 0-151 9t-152 9q-3-51-3-52v-9q17-27 61.5-43t98.5-29 78-27q19-42 19-383 0-101-3-303t-3-303v-117q0-2 .5-15.5t.5-25-1-25.5-3-24-5-14q-11-12-162-12-33 0-93 12t-80 26q-19 13-34 72.5t-31.5 111-42.5 53.5q-42-26-56-44v-383z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_paragraph jodit-toolbar-button_with-trigger_true jodit-ui-group__paragraph" role="listitem" data-ref="paragraph" ref="paragraph" aria-label="Insert format block"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_paragraph jodit-icon"><path d="M1534 189v73q0 29-18.5 61t-42.5 32q-50 0-54 1-26 6-32 31-3 11-3 64v1152q0 25-18 43t-43 18h-108q-25 0-43-18t-18-43v-1218h-143v1218q0 25-17.5 43t-43.5 18h-108q-26 0-43.5-18t-17.5-43v-496q-147-12-245-59-126-58-192-179-64-117-64-259 0-166 88-286 88-118 209-159 111-37 417-37h479q25 0 43 18t18 43z"></path></svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_lineHeight jodit-toolbar-button_with-trigger_true jodit-ui-group__lineHeight" role="listitem" data-ref="lineHeight" ref="lineHeight" aria-label="Line height"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_lineHeight jodit-icon"> <path d="M5.09668 6.99707H7.17358L4.17358 3.99707L1.17358 6.99707H3.09668V17.0031H1.15881L4.15881 20.0031L7.15881 17.0031H5.09668V6.99707Z"></path> <path d="M22.8412 7H8.84119V5H22.8412V7Z"></path> <path d="M22.8412 11H8.84119V9H22.8412V11Z"></path> <path d="M8.84119 15H22.8412V13H8.84119V15Z"></path> <path d="M22.8412 19H8.84119V17H22.8412V19Z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-spacer"></div><div class="jodit-ui-group jodit-ui-group_size_middle"></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_script jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_superscript jodit-ui-group__superscript" role="listitem" data-ref="superscript" ref="superscript" aria-label="superscript"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_superscript jodit-icon"> <path d="M1025 1369v167h-248l-159-252-24-42q-8-9-11-21h-3l-9 21q-10 20-25 44l-155 250h-258v-167h128l197-291-185-272h-137v-168h276l139 228q2 4 23 42 8 9 11 21h3q3-9 11-21l25-42 140-228h257v168h-125l-184 267 204 296h109zm637-679v206h-514l-3-27q-4-28-4-46 0-64 26-117t65-86.5 84-65 84-54.5 65-54 26-64q0-38-29.5-62.5t-70.5-24.5q-51 0-97 39-14 11-36 38l-105-92q26-37 63-66 83-65 188-65 110 0 178 59.5t68 158.5q0 56-24.5 103t-62 76.5-81.5 58.5-82 50.5-65.5 51.5-30.5 63h232v-80h126z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_subscript jodit-ui-group__subscript" role="listitem" data-ref="subscript" ref="subscript" aria-label="subscript"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_subscript jodit-icon"> <path d="M1025 1369v167h-248l-159-252-24-42q-8-9-11-21h-3l-9 21q-10 20-25 44l-155 250h-258v-167h128l197-291-185-272h-137v-168h276l139 228q2 4 23 42 8 9 11 21h3q3-9 11-21l25-42 140-228h257v168h-125l-184 267 204 296h109zm639 217v206h-514l-4-27q-3-45-3-46 0-64 26-117t65-86.5 84-65 84-54.5 65-54 26-64q0-38-29.5-62.5t-70.5-24.5q-51 0-97 39-14 11-36 38l-105-92q26-37 63-66 80-65 188-65 110 0 178 59.5t68 158.5q0 66-34.5 118.5t-84 86-99.5 62.5-87 63-41 73h232v-80h126z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_classSpan jodit-toolbar-button_with-trigger_true jodit-ui-group__classSpan" role="listitem" data-ref="classSpan" ref="classSpan" aria-label="Insert className"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_classSpan jodit-icon"> <path d="M36 4h-24c-2.21 0-4 1.79-4 4v32c0 2.21 1.79 4 4 4h24c2.21 0 4-1.79 4-4v-32c0-2.21-1.79-4-4-4zm-24 4h10v16l-5-3-5 3v-16z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_media jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_file jodit-ui-group__file" role="listitem" data-ref="file" ref="file" aria-label="Insert file"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_file jodit-icon"> <path d="M1152 512v-472q22 14 36 28l408 408q14 14 28 36h-472zm-128 32q0 40 28 68t68 28h544v1056q0 40-28 68t-68 28h-1344q-40 0-68-28t-28-68v-1600q0-40 28-68t68-28h800v544z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_image jodit-ui-group__image" role="listitem" data-ref="image" ref="image" aria-label="Insert Image"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_image jodit-icon"> <path d="M576 576q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm1024 384v448h-1408v-192l320-320 160 160 512-512zm96-704h-1600q-13 0-22.5 9.5t-9.5 22.5v1216q0 13 9.5 22.5t22.5 9.5h1600q13 0 22.5-9.5t9.5-22.5v-1216q0-13-9.5-22.5t-22.5-9.5zm160 32v1216q0 66-47 113t-113 47h-1600q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1600q66 0 113 47t47 113z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_video jodit-ui-group__video" role="listitem" data-ref="video" ref="video" aria-label="Insert youtube/vimeo video"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_video jodit-icon"> <path d="M1792 352v1088q0 42-39 59-13 5-25 5-27 0-45-19l-403-403v166q0 119-84.5 203.5t-203.5 84.5h-704q-119 0-203.5-84.5t-84.5-203.5v-704q0-119 84.5-203.5t203.5-84.5h704q119 0 203.5 84.5t84.5 203.5v165l403-402q18-19 45-19 12 0 25 5 39 17 39 59z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div></div><div class="jodit-ui-group jodit-ui-group_line_true jodit-ui-group_size_middle"><div class="jodit-ui-group jodit-ui-group_size_middle"></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_state jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_stroke_false jodit-toolbar-button_speechRecognize jodit-toolbar-button_with-trigger_true jodit-ui-group__speechRecognize" role="listitem" data-ref="speechRecognize" ref="speechRecognize" aria-label="Speech Recognize"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_speechRecognize jodit-icon"> <path d="M8,11c1.657,0,3-1.343,3-3V3c0-1.657-1.343-3-3-3S5,1.343,5,3v5C5,9.657,6.343,11,8,11z"></path> <path d="M13,8V6h-1l0,1.844c0,1.92-1.282,3.688-3.164,4.071C6.266,12.438,4,10.479,4,8V6H3v2c0,2.414,1.721,4.434,4,4.899V15H5v1h6 v-1H9v-2.101C11.279,12.434,13,10.414,13,8z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_spellcheck jodit-ui-group__spellcheck" role="listitem" data-ref="spellcheck" ref="spellcheck" aria-label="Spellcheck"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="jodit-icon"> <path d="M24.89 32h4.18L18.86 6h-3.71L4.93 32h4.18l2.25-6h11.29l2.24 6zM12.86 22L17 10.95 21.14 22h-8.28zm30.31 1.17L27 39.34 19.66 32l-2.83 2.83L27 45l19-19-2.83-2.83z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_clipboard jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_cut jodit-ui-group__cut" role="listitem" data-ref="cut" ref="cut" aria-label="Cut selection" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_cut jodit-icon"> <path d="M960 896q26 0 45 19t19 45-19 45-45 19-45-19-19-45 19-45 45-19zm300 64l507 398q28 20 25 56-5 35-35 51l-128 64q-13 7-29 7-17 0-31-8l-690-387-110 66q-8 4-12 5 14 49 10 97-7 77-56 147.5t-132 123.5q-132 84-277 84-136 0-222-78-90-84-79-207 7-76 56-147t131-124q132-84 278-84 83 0 151 31 9-13 22-22l122-73-122-73q-13-9-22-22-68 31-151 31-146 0-278-84-82-53-131-124t-56-147q-5-59 15.5-113t63.5-93q85-79 222-79 145 0 277 84 83 52 132 123t56 148q4 48-10 97 4 1 12 5l110 66 690-387q14-8 31-8 16 0 29 7l128 64q30 16 35 51 3 36-25 56zm-681-260q46-42 21-108t-106-117q-92-59-192-59-74 0-113 36-46 42-21 108t106 117q92 59 192 59 74 0 113-36zm-85 745q81-51 106-117t-21-108q-39-36-113-36-100 0-192 59-81 51-106 117t21 108q39 36 113 36 100 0 192-59zm178-613l96 58v-11q0-36 33-56l14-8-79-47-26 26q-3 3-10 11t-12 12q-2 2-4 3.5t-3 2.5zm224 224l96 32 736-576-128-64-768 431v113l-160 96 9 8q2 2 7 6 4 4 11 12t11 12l26 26zm704 416l128-64-520-408-177 138q-2 3-13 7z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_copy jodit-ui-group__copy" role="listitem" data-ref="copy" ref="copy" aria-label="Copy selection" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_copy jodit-icon"> <path d="M24.89,6.61H22.31V4.47A2.47,2.47,0,0,0,19.84,2H6.78A2.47,2.47,0,0,0,4.31,4.47V22.92a2.47,2.47,0,0,0,2.47,2.47H9.69V27.2a2.8,2.8,0,0,0,2.8,2.8h12.4a2.8,2.8,0,0,0,2.8-2.8V9.41A2.8,2.8,0,0,0,24.89,6.61ZM6.78,23.52a.61.61,0,0,1-.61-.6V4.47a.61.61,0,0,1,.61-.6H19.84a.61.61,0,0,1,.61.6V6.61h-8a2.8,2.8,0,0,0-2.8,2.8V23.52Zm19,3.68a.94.94,0,0,1-.94.93H12.49a.94.94,0,0,1-.94-.93V9.41a.94.94,0,0,1,.94-.93h12.4a.94.94,0,0,1,.94.93Z"></path> <path d="M23.49,13.53h-9.6a.94.94,0,1,0,0,1.87h9.6a.94.94,0,1,0,0-1.87Z"></path> <path d="M23.49,17.37h-9.6a.94.94,0,1,0,0,1.87h9.6a.94.94,0,1,0,0-1.87Z"></path> <path d="M23.49,21.22h-9.6a.93.93,0,1,0,0,1.86h9.6a.93.93,0,1,0,0-1.86Z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_paste jodit-toolbar-button_with-trigger_true jodit-ui-group__paste" role="listitem" data-ref="paste" ref="paste" aria-label="Paste from clipboard"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_paste jodit-icon"> <path stroke-width="0" d="M10.5 20H2a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h1V3l2.03-.4a3 3 0 0 1 5.94 0L13 3v1h1a2 2 0 0 1 2 2v1h-2V6h-1v1H3V6H2v12h5v2h3.5zM8 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm2 4h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2zm0 2v8h8v-8h-8z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_selectall jodit-ui-group__selectall" role="listitem" data-ref="selectall" ref="selectall" aria-label="Select all"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="jodit-icon_select_all jodit-icon"> <g fill-rule="evenodd" stroke="none" stroke-width="1"> <g transform="translate(-381.000000, -381.000000)"> <g transform="translate(381.000000, 381.000000)"> <path d="M0,2 L2,2 L2,0 C0.9,0 0,0.9 0,2 L0,2 Z M0,10 L2,10 L2,8 L0,8 L0,10 L0,10 Z M4,18 L6,18 L6,16 L4,16 L4,18 L4,18 Z M0,6 L2,6 L2,4 L0,4 L0,6 L0,6 Z M10,0 L8,0 L8,2 L10,2 L10,0 L10,0 Z M16,0 L16,2 L18,2 C18,0.9 17.1,0 16,0 L16,0 Z M2,18 L2,16 L0,16 C0,17.1 0.9,18 2,18 L2,18 Z M0,14 L2,14 L2,12 L0,12 L0,14 L0,14 Z M6,0 L4,0 L4,2 L6,2 L6,0 L6,0 Z M8,18 L10,18 L10,16 L8,16 L8,18 L8,18 Z M16,10 L18,10 L18,8 L16,8 L16,10 L16,10 Z M16,18 C17.1,18 18,17.1 18,16 L16,16 L16,18 L16,18 Z M16,6 L18,6 L18,4 L16,4 L16,6 L16,6 Z M16,14 L18,14 L18,12 L16,12 L16,14 L16,14 Z M12,18 L14,18 L14,16 L12,16 L12,18 L12,18 Z M12,2 L14,2 L14,0 L12,0 L12,2 L12,2 Z M4,14 L14,14 L14,4 L4,4 L4,14 L4,14 Z M6,6 L12,6 L12,12 L6,12 L6,6 L6,6 Z"></path> </g> </g> </g> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_copyformat jodit-ui-group__copyformat" role="listitem" data-ref="copyformat" ref="copyformat" aria-label="Paint format"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="jodit-icon_copyformat jodit-icon"> <path stroke-width="0" d="M16 9v-6h-3v-1c0-0.55-0.45-1-1-1h-11c-0.55 0-1 0.45-1 1v3c0 0.55 0.45 1 1 1h11c0.55 0 1-0.45 1-1v-1h2v4h-9v2h-0.5c-0.276 0-0.5 0.224-0.5 0.5v5c0 0.276 0.224 0.5 0.5 0.5h2c0.276 0 0.5-0.224 0.5-0.5v-5c0-0.276-0.224-0.5-0.5-0.5h-0.5v-1h9zM12 3h-11v-1h11v1z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_insert jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_hr jodit-ui-group__hr" role="listitem" data-ref="hr" ref="hr" aria-label="Insert Horizontal Line"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_hr jodit-icon"> <path d="M1600 736v192q0 40-28 68t-68 28h-1216q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h1216q40 0 68 28t28 68z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_table jodit-ui-group__table" role="listitem" data-ref="table" ref="table" aria-label="Insert table"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_table jodit-icon"> <path d="M576 1376v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm-512-768v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm512 384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm0-384v-192q0-14-9-23t-23-9h-320q-14 0-23 9t-9 23v192q0 14 9 23t23 9h320q14 0 23-9t9-23zm128-320v1088q0 66-47 113t-113 47h-1344q-66 0-113-47t-47-113v-1088q0-66 47-113t113-47h1344q66 0 113 47t47 113z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_link jodit-ui-group__link" role="listitem" data-ref="link" ref="link" aria-label="Insert link"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_link jodit-icon"> <path d="M1520 1216q0-40-28-68l-208-208q-28-28-68-28-42 0-72 32 3 3 19 18.5t21.5 21.5 15 19 13 25.5 3.5 27.5q0 40-28 68t-68 28q-15 0-27.5-3.5t-25.5-13-19-15-21.5-21.5-18.5-19q-33 31-33 73 0 40 28 68l206 207q27 27 68 27 40 0 68-26l147-146q28-28 28-67zm-703-705q0-40-28-68l-206-207q-28-28-68-28-39 0-68 27l-147 146q-28 28-28 67 0 40 28 68l208 208q27 27 68 27 42 0 72-31-3-3-19-18.5t-21.5-21.5-15-19-13-25.5-3.5-27.5q0-40 28-68t68-28q15 0 27.5 3.5t25.5 13 19 15 21.5 21.5 18.5 19q33-31 33-73zm895 705q0 120-85 203l-147 146q-83 83-203 83-121 0-204-85l-206-207q-83-83-83-203 0-123 88-209l-88-88q-86 88-208 88-120 0-204-84l-208-208q-84-84-84-204t85-203l147-146q83-83 203-83 121 0 204 85l206 207q83 83 83 203 0 123-88 209l88 88q86-88 208-88 120 0 204 84l208 208q84 84 84 204z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_symbols jodit-ui-group__symbols" role="listitem" data-ref="symbols" ref="symbols" aria-label="Insert Special Character"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" class="jodit-icon_symbols jodit-icon"> <path d="m240.443652,220.45085l-47.410809,0l0,-10.342138c13.89973,-8.43655 25.752896,-19.844464 34.686646,-33.469923c11.445525,-17.455846 17.496072,-37.709239 17.496072,-58.570077c0,-59.589197 -49.208516,-108.068714 -109.693558,-108.068714s-109.69263,48.479517 -109.69263,108.069628c0,20.860839 6.050547,41.113316 17.497001,58.570077c8.93375,13.625459 20.787845,25.032458 34.686646,33.469008l0,10.342138l-47.412666,0c-10.256959,0 -18.571354,8.191376 -18.571354,18.296574c0,10.105198 8.314395,18.296574 18.571354,18.296574l65.98402,0c10.256959,0 18.571354,-8.191376 18.571354,-18.296574l0,-39.496814c0,-7.073455 -4.137698,-13.51202 -10.626529,-16.537358c-25.24497,-11.772016 -41.557118,-37.145704 -41.557118,-64.643625c0,-39.411735 32.545369,-71.476481 72.549922,-71.476481c40.004553,0 72.550851,32.064746 72.550851,71.476481c0,27.497006 -16.312149,52.87161 -41.557118,64.643625c-6.487902,3.026253 -10.6256,9.464818 -10.6256,16.537358l0,39.496814c0,10.105198 8.314395,18.296574 18.571354,18.296574l65.982163,0c10.256959,0 18.571354,-8.191376 18.571354,-18.296574c0,-10.105198 -8.314395,-18.296574 -18.571354,-18.296574z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_ai_commands jodit-toolbar-button_with-trigger_true jodit-ui-group__ai-commands" role="listitem" data-ref="ai-commands" ref="ai-commands" aria-label="AI Commands" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" class="jodit-icon_ai_commands jodit-icon"> <path d="M 255.9537,58.150081 237.69527,40.997278 c -1.49414,-1.375593 -3.43653,-2.077427 -5.37891,-2.077427 -1.94239,0 -3.88478,0.701834 -5.37892,2.077427 L 29.919751,226.1128 c -2.988286,2.77926 -2.988286,7.32714 0,10.13447 L 48.148295,253.372 c 1.46426,1.37559 3.406646,2.1055 5.378915,2.1055 1.972268,0 3.884771,-0.72991 5.378914,-2.1055 L 221.34935,100.73732 255.9537,68.284552 c 2.9584,-2.807333 2.9584,-7.355212 0,-10.134471 z M 251.17244,63.79282 221.34935,91.781927 201.89561,73.506191 231.68882,45.48901 c 0.20918,-0.140367 0.38847,-0.224587 0.62754,-0.224587 0.23906,0 0.44824,0.08422 0.59765,0.224587 l 18.25843,17.152803 c 0,0 0.23906,0.33688 0.23906,0.561467 0,0.224586 -0.0896,0.4211 -0.23906,0.58954 z" style="stroke-width:2.8964;stroke-opacity:1"></path> <path d="m 48.626421,116.87948 10.578532,23.10435 c 0.83672,1.82477 3.615826,1.85284 4.452546,0 l 10.937126,-23.52545 c 2.629692,-5.69888 7.470715,-10.24676 13.536935,-12.71722 l 25.07172,-10.274833 c 1.94239,-0.786053 1.94239,-3.396873 0,-4.182926 L 88.13156,79.008563 C 82.06534,76.53811 77.224317,71.990231 74.594625,66.291346 L 63.657499,42.737824 c -0.83672,-1.824766 -3.615826,-1.824766 -4.452546,0 L 48.267826,66.291346 C 45.638135,71.990231 40.797112,76.53811 34.730891,79.008563 L 9.6292894,89.311474 c -1.9423859,0.786054 -1.9423859,3.3688 0,4.182926 l 25.5498446,10.61172 c 6.036338,2.49852 10.847478,7.07448 13.477169,12.77336 z" style="stroke-width:2.8964;fill-opacity:1;stroke-opacity:1"></path> <path d="m 111.79878,33.136746 13.56682,5.642739 c 3.19747,1.319446 5.76739,3.761826 7.14201,6.793745 l 5.61797,12.268044 c 0.44825,0.982567 1.91251,0.982567 2.36075,0 l 5.79727,-12.492631 c 1.4045,-3.031919 3.97442,-5.446225 7.20177,-6.765672 l 13.29788,-5.446225 c 1.0459,-0.4211 1.0459,-1.796693 0,-2.217793 l -13.29788,-5.446225 c -3.22735,-1.319447 -5.79727,-3.733753 -7.20177,-6.765672 L 140.48633,6.2144248 c -0.44824,-0.9825664 -1.9125,-0.9825664 -2.36075,0 l -5.79727,12.4926312 c -1.4045,3.031919 -3.97442,5.446225 -7.20177,6.765672 l -13.32776,5.474298 c -1.01601,0.4211 -1.0459,1.796693 0,2.217793 z" style="stroke-width:2.8964;fill-opacity:1"></path> <path d="m 233.09331,192.98627 -14.13459,-5.7831 c -3.40665,-1.40367 -6.12599,-3.95834 -7.62013,-7.1587 l -6.15587,-13.27868 c -0.47813,-1.03872 -2.03203,-1.03872 -2.51016,0 l -6.15587,13.27868 c -1.49414,3.20036 -4.21348,5.75503 -7.62013,7.1587 l -14.13459,5.81118 c -1.10567,0.44917 -1.10567,1.90898 0,2.35816 l 14.40354,5.97961 c 3.40664,1.40367 6.12598,3.98642 7.59024,7.21485 l 5.97658,13.02602 c 0.47812,1.03872 2.03203,1.03872 2.51016,0 l 6.15586,-13.25061 c 1.49415,-3.20036 4.21349,-5.75503 7.62013,-7.1587 l 14.1346,-5.7831 c 1.10566,-0.44917 1.10566,-1.90899 0,-2.35816 z" style="stroke-width:2.8964;stroke-opacity:1"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger" disabled="disabled"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_ai_assistant jodit-ui-group__ai-assistant" role="listitem" data-ref="ai-assistant" ref="ai-assistant" aria-label="AI Assistant" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="jodit-icon_ai_assistant jodit-icon"> <g transform="scale(1.2 1.2) translate(-2 -0.5)"> <path d="M 22,12.5 A 1.49995,1.49995 0 0 0 20.50006,11 H 20 V 10 A 3,3 0 0 0 17,7 H 13 V 5.7226 a 2,2 0 1 0 -2,0 V 7 H 7 a 3,3 0 0 0 -3,3 v 1 H 3.49994 a 1.5,1.5 0 0 0 0,3 H 4 v 1 A 3.00128,3.00128 0 0 0 6.20251,17.89282 1.03113,1.03113 0 0 1 7,18.86975 v 0.716 a 0.99928,0.99928 0 0 0 1.00726,1.002 0.9792,0.9792 0 0 0 0.69983,-0.29486 l 2,-2 A 1,1 0 0 1 11.41425,18 H 17 a 3,3 0 0 0 3,-3 v -1 h 0.50006 A 1.49995,1.49995 0 0 0 22,12.5 Z M 19,15 a 2.00226,2.00226 0 0 1 -2,2 H 11.41425 A 1.987,1.987 0 0 0 10,17.58575 l -2,2 v -0.716 A 2.02082,2.02082 0 0 0 6.46771,16.92865 2.00439,2.00439 0 0 1 5,15 V 10 A 2.00226,2.00226 0 0 1 7,8 h 10 a 2.00222,2.00222 0 0 1 2,2 z M 10,12.5 A 1.5,1.5 0 1 1 8.5,11 1.5,1.5 0 0 1 10,12.5 Z m 7,0 A 1.5,1.5 0 1 1 15.5,11 1.5,1.5 0 0 1 17,12.5 Z"></path> </g> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_indent jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_indent jodit-ui-group__indent" role="listitem" data-ref="indent" ref="indent" aria-label="Increase Indent"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_indent jodit-icon"> <path d="M352 832q0 14-9 23l-288 288q-9 9-23 9-13 0-22.5-9.5t-9.5-22.5v-576q0-13 9.5-22.5t22.5-9.5q14 0 23 9l288 288q9 9 9 23zm1440 480v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_outdent jodit-ui-group__outdent" role="listitem" data-ref="outdent" ref="outdent" aria-label="Decrease Indent" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_outdent jodit-icon"> <path d="M384 544v576q0 13-9.5 22.5t-22.5 9.5q-14 0-23-9l-288-288q-9-9-9-23t9-23l288-288q9-9 23-9 13 0 22.5 9.5t9.5 22.5zm1408 768v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1088q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1088q13 0 22.5 9.5t9.5 22.5zm0-384v192q0 13-9.5 22.5t-22.5 9.5h-1728q-13 0-22.5-9.5t-9.5-22.5v-192q0-13 9.5-22.5t22.5-9.5h1728q13 0 22.5 9.5t9.5 22.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_left jodit-toolbar-button_with-trigger_true jodit-ui-group__left" role="listitem" data-ref="left" ref="left" aria-label="Align"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_left jodit-icon"> <path d="M1792 1344v128q0 26-19 45t-45 19h-1664q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1664q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1280q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1280q26 0 45 19t19 45zm256-384v128q0 26-19 45t-45 19h-1536q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1536q26 0 45 19t19 45zm-384-384v128q0 26-19 45t-45 19h-1152q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1152q26 0 45 19t19 45z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_color jodit-ui-group_before-spacer_true jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_brush jodit-toolbar-button_with-trigger_true jodit-ui-group__brush" role="listitem" data-ref="brush" ref="brush" aria-label="Fill color or set the text color"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_brush jodit-icon"> <path d="M896 1152q0-36-20-69-1-1-15.5-22.5t-25.5-38-25-44-21-50.5q-4-16-21-16t-21 16q-7 23-21 50.5t-25 44-25.5 38-15.5 22.5q-20 33-20 69 0 53 37.5 90.5t90.5 37.5 90.5-37.5 37.5-90.5zm512-128q0 212-150 362t-362 150-362-150-150-362q0-145 81-275 6-9 62.5-90.5t101-151 99.5-178 83-201.5q9-30 34-47t51-17 51.5 17 33.5 47q28 93 83 201.5t99.5 178 101 151 62.5 90.5q81 127 81 275z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-spacer"></div><div class="jodit-ui-group jodit-ui-group_size_middle"></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_history jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_undo jodit-ui-group__undo" role="listitem" data-ref="undo" ref="undo" aria-label="Undo" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_undo jodit-icon"> <path d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_redo jodit-ui-group__redo" role="listitem" data-ref="redo" ref="redo" aria-label="Redo" disabled="disabled"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1" disabled="disabled"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_redo jodit-icon"> <path d="M1664 256v448q0 26-19 45t-45 19h-448q-42 0-59-40-17-39 14-69l138-138q-148-137-349-137-104 0-198.5 40.5t-163.5 109.5-109.5 163.5-40.5 198.5 40.5 198.5 109.5 163.5 163.5 109.5 198.5 40.5q119 0 225-52t179-147q7-10 23-12 14 0 25 9l137 138q9 8 9.5 20.5t-7.5 22.5q-109 132-264 204.5t-327 72.5q-156 0-298-61t-245-164-164-245-61-298 61-298 164-245 245-164 298-61q147 0 284.5 55.5t244.5 156.5l130-129q29-31 70-14 39 17 39 59z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_search jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_find jodit-toolbar-button_with-trigger_true jodit-ui-group__find" role="listitem" data-ref="find" ref="find" aria-label="Find"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_search jodit-icon"> <path clip-rule="evenodd" d="M306.39,154.09c19.628,4.543,35.244,21.259,39.787,39.523 c1.551,8.54,8.998,14.989,17.904,14.989c9.991,0,18.168-8.175,18.168-18.17c0-13.083-10.991-32.98-25.985-47.881 c-14.719-14.537-32.252-24.802-46.695-24.802c-9.991,0-18.172,8.45-18.172,18.446C291.396,145.094,297.847,152.546,306.39,154.09z M56.629,392.312c-14.09,14.08-14.09,36.979,0,51.059c14.08,14.092,36.981,14.092,50.965,0l104.392-104.303 c24.347,15.181,53.062,23.991,83.953,23.991c87.857,0,158.995-71.142,158.995-158.999c0-87.854-71.138-158.995-158.995-158.995 c-87.856,0-158.995,71.141-158.995,158.995c0,30.802,8.819,59.606,23.992,83.953L56.629,392.312z M182.371,204.06 c0-62.687,50.875-113.568,113.568-113.568s113.569,50.881,113.569,113.568c0,62.694-50.876,113.569-113.569,113.569 S182.371,266.754,182.371,204.06z" fill-rule="evenodd"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button><span role="trigger" class="jodit-toolbar-button__trigger"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"> <path d="M.941 4.523a.75.75 0 1 1 1.06-1.06l3.006 3.005 3.005-3.005a.75.75 0 1 1 1.06 1.06l-3.549 3.55a.75.75 0 0 1-1.168-.136L.941 4.523z"></path> </svg></span></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_source jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_source jodit-ui-group__source" role="listitem" data-ref="source" ref="source" aria-label="Change mode"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_source jodit-icon"> <path d="M553 1399l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23t-10 23l-393 393 393 393q10 10 10 23t-10 23zm591-1067l-373 1291q-4 13-15.5 19.5t-23.5 2.5l-62-17q-13-4-19.5-15.5t-2.5-24.5l373-1291q4-13 15.5-19.5t23.5-2.5l62 17q13 4 19.5 15.5t2.5 24.5zm657 651l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23t-10 23z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_other jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_fullsize jodit-ui-group__fullsize" role="listitem" data-ref="fullsize" ref="fullsize" aria-label="Open in fullsize" aria-pressed="true"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="true" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_shrink jodit-icon"> <path d="M896 960v448q0 26-19 45t-45 19-45-19l-144-144-332 332q-10 10-23 10t-23-10l-114-114q-10-10-10-23t10-23l332-332-144-144q-19-19-19-45t19-45 45-19h448q26 0 45 19t19 45zm755-672q0 13-10 23l-332 332 144 144q19 19 19 45t-19 45-45 19h-448q-26 0-45-19t-19-45v-448q0-26 19-45t45-19 45 19l144 144 332-332q10-10 23-10t23 10l114 114q10 10 10 23z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_preview jodit-ui-group__preview" role="listitem" data-ref="preview" ref="preview" aria-label="Preview"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_eye jodit-icon"> <path d="M1664 960q-152-236-381-353 61 104 61 225 0 185-131.5 316.5t-316.5 131.5-316.5-131.5-131.5-316.5q0-121 61-225-229 117-381 353 133 205 333.5 326.5t434.5 121.5 434.5-121.5 333.5-326.5zm-720-384q0-20-14-34t-34-14q-125 0-214.5 89.5t-89.5 214.5q0 20 14 34t34 14 34-14 14-34q0-86 61-147t147-61q20 0 34-14t14-34zm848 384q0 34-20 69-140 230-376.5 368.5t-499.5 138.5-499.5-139-376.5-368q-20-35-20-69t20-69q140-229 376.5-368t499.5-139 499.5 139 376.5 368q20 35 20 69z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_print jodit-ui-group__print" role="listitem" data-ref="print" ref="print" aria-label="Print"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1792 1792" class="jodit-icon_print jodit-icon"> <path d="M448 1536h896v-256h-896v256zm0-640h896v-384h-160q-40 0-68-28t-28-68v-160h-640v640zm1152 64q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128 0v416q0 13-9.5 22.5t-22.5 9.5h-224v160q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-160h-224q-13 0-22.5-9.5t-9.5-22.5v-416q0-79 56.5-135.5t135.5-56.5h64v-544q0-40 28-68t68-28h672q40 0 88 20t76 48l152 152q28 28 48 76t20 88v256h64q79 0 135.5 56.5t56.5 135.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div><div class="jodit-ui-group jodit-ui-group_separated_true jodit-ui-group_group_info jodit-ui-group_size_middle"><span class="jodit-toolbar-button jodit-toolbar-button_size_middle jodit-toolbar-button_variant_initial jodit-toolbar-button_about jodit-ui-group__about" role="listitem" data-ref="about" ref="about" aria-label="About Jodit"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg" class="jodit-icon_about jodit-icon"> <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path> </svg></span><span class="jodit-toolbar-button__text"></span></button></span></div></div></div></div><div contenteditable="false" class="jodit-workplace" tabindex="-1" style="min-height: 101px; height: 585px;"><div contenteditable="true" aria-disabled="false" tabindex="-1" class="jodit-wysiwyg" spellcheck="false" style="min-height: 101px;"><div style="max-width: 600px; margin: 0 auto; text-align: center; border: 1px solid #ccc; padding: 20px;">
    <h1 style="color: #555; font-size: 24px; font-weight: bold;">
        Here is the quotation you requested from us!!
    </h1>

    <div style="margin: 20px 0;">
        <button type="button" style="background-color: #1a73e8; color: #fff; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">
            <a href="https://localhost/package-mail/69745d68cd9d6d75e8c6032f" style="color: #fff; text-decoration: none;">
                <span>Click here to View Package!!</span>
            </a>
        </button>
    </div>

    <p style="color: #1a73e8; font-size: 14px; margin-top: 0;">
        This package is valid for 24 Hrs. Freeze your Package by Paying immediately INR 5000/-
    </p>

    <h2 style="color: #1a73e8; font-size: 20px; font-weight: bold;">
        Seal the deal now!
    </h2>

    <p style="color: #333; font-size: 14px;">
        Make the payment today to get the best deal possible
    </p>

    <div style="margin: 20px 0;">
        <button type="button" style="background-color: #1a73e8; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;">
            <a href="https://www.tripzipper.co.in/payment" style="color: #fff; text-decoration: none;">Pay Now</a>
        </button>
    </div>

    <p style="color: #555; font-size: 14px; margin-top: 20px;">
        For any queries please contact your Travel Expert.
    </p>

    <p style="color: #333; font-size: 14px;">
        <strong>VANSHIKA</strong><br>
        Phone Number: +91 9599008756
    </p>
    <p style="color: #333; font-size: 14px;"> Email: <a href="mailto:enquiry@tripzipper.co.in" style="color: #1a73e8;">enquiry@tripzipper.co.in</a>
    </p>
</div></div><div class="jodit-source"><textarea class="jodit-source__mirror" style="min-height: 101px; height: 0px;"></textarea></div></div><div class="jodit-status-bar"><div class="jodit-status-bar__item jodit-status-bar__item-right"><span>Chars: 304</span></div><div class="jodit-status-bar__item jodit-status-bar__item-right"><span>Words: 59</span></div><div class="jodit-status-bar__item"><div class="jodit-xpath"><span class="jodit-toolbar-button jodit-toolbar-button_variant_initial jodit-toolbar-button_selectall jodit-toolbar-button_size_tiny" role="listitem" data-ref="selectall" ref="selectall" aria-label="Select all"><button class="jodit-toolbar-button__button" type="button" role="button" aria-pressed="false" tabindex="-1"><span class="jodit-toolbar-button__icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="jodit-icon_select_all jodit-icon"> <g fill-rule="evenodd" stroke="none" stroke-width="1"> <g transform="translate(-381.000000, -381.000000)"> <g transform="translate(381.000000, 381.000000)"> <path d="M0,2 L2,2 L2,0 C0.9,0 0,0.9 0,2 L0,2 Z M0,10 L2,10 L2,8 L0,8 L0,10 L0,10 Z M4,18 L6,18 L6,16 L4,16 L4,18 L4,18 Z M0,6 L2,6 L2,4 L0,4 L0,6 L0,6 Z M10,0 L8,0 L8,2 L10,2 L10,0 L10,0 Z M16,0 L16,2 L18,2 C18,0.9 17.1,0 16,0 L16,0 Z M2,18 L2,16 L0,16 C0,17.1 0.9,18 2,18 L2,18 Z M0,14 L2,14 L2,12 L0,12 L0,14 L0,14 Z M6,0 L4,0 L4,2 L6,2 L6,0 L6,0 Z M8,18 L10,18 L10,16 L8,16 L8,18 L8,18 Z M16,10 L18,10 L18,8 L16,8 L16,10 L16,10 Z M16,18 C17.1,18 18,17.1 18,16 L16,16 L16,18 L16,18 Z M16,6 L18,6 L18,4 L16,4 L16,6 L16,6 Z M16,14 L18,14 L18,12 L16,12 L16,14 L16,14 Z M12,18 L14,18 L14,16 L12,16 L12,18 L12,18 Z M12,2 L14,2 L14,0 L12,0 L12,2 L12,2 Z M4,14 L14,14 L14,4 L4,4 L4,14 L4,14 Z M6,6 L12,6 L12,12 L6,12 L6,6 L6,6 Z"></path> </g> </g> </g> </svg></span><span class="jodit-toolbar-button__text"></span></button></span>&#xFEFF;</div></div><div class="jodit-status-bar__item jodit-status-bar__item-right"><a tabindex="-1" style="text-transform: uppercase" class="jodit-status-bar-link" target="_blank" href="https://xdsoft.net/jodit/">
							Powered by Jodit
						</a></div></div></div><textarea style="display: none;">&lt;div style="max-width: 600px; margin: 0 auto; text-align: center; border: 1px solid #ccc; padding: 20px;"&gt;
    &lt;h1 style="color: #555; font-size: 24px; font-weight: bold;"&gt;
        Here is the quotation you requested from us!!
    &lt;/h1&gt;

    &lt;div style="margin: 20px 0;"&gt;
        &lt;button type="button" style="background-color: #1a73e8; color: #fff; padding: 15px 30px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;"&gt;
            &lt;a href="https://localhost/package-mail/69745d68cd9d6d75e8c6032f" style="color: #fff; text-decoration: none;"&gt;
                &lt;span&gt;Click here to View Package!!&lt;/span&gt;
            &lt;/a&gt;
        &lt;/button&gt;
    &lt;/div&gt;

    &lt;p style="color: #1a73e8; font-size: 14px; margin-top: 0;"&gt;
        This package is valid for 24 Hrs. Freeze your Package by Paying immediately INR 5000/-
    &lt;/p&gt;

    &lt;h2 style="color: #1a73e8; font-size: 20px; font-weight: bold;"&gt;
        Seal the deal now!
    &lt;/h2&gt;

    &lt;p style="color: #333; font-size: 14px;"&gt;
        Make the payment today to get the best deal possible
    &lt;/p&gt;

    &lt;div style="margin: 20px 0;"&gt;
        &lt;button type="button" style="background-color: #1a73e8; color: #fff; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer;"&gt;
            &lt;a href="https://www.tripzipper.co.in/payment" style="color: #fff; text-decoration: none;"&gt;Pay Now&lt;/a&gt;
        &lt;/button&gt;
    &lt;/div&gt;

    &lt;p style="color: #555; font-size: 14px; margin-top: 20px;"&gt;
        For any queries please contact your Travel Expert.
    &lt;/p&gt;

    &lt;p style="color: #333; font-size: 14px;"&gt;
        &lt;strong&gt;VANSHIKA&lt;/strong&gt;&lt;br&gt;
        Phone Number: +91 9599008756
    &lt;/p&gt;
    &lt;p style="color: #333; font-size: 14px;"&gt; Email: &lt;a href="mailto:enquiry@tripzipper.co.in" style="color: #1a73e8;"&gt;enquiry@tripzipper.co.in&lt;/a&gt;
    &lt;/p&gt;
&lt;/div&gt;</textarea></div></div></div></div></div></div></div></div></section></div></div><span data-focus-scope-end="true" hidden="" inert=""></span><script type="text/javascript" async="true" src="https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.4/beautify.min.js" inert=""></script><script type="text/javascript" async="true" src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.2/ace.js" inert=""></script><div class="jodit jodit-ui-tooltip-container jodit-box jodit_theme_default" inert=""><div class="jodit-ui-tooltip jodit-ui-tooltip_visible_false" style="left: -5000px; top: 376px;"><div class="jodit-ui-tooltip__content">Open in fullsize</div></div></div></body><rq-implicit-test-rule-widget class="rq-element" style="display: none;" draggable="true"></rq-implicit-test-rule-widget></html>