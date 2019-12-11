/**
 * Created by mobiletek on 17/9/4.
 */
(function () {
    // 顺序依次加载外部的css文件
    function addStyleFile(file) {
        var link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('type','text/css');
        link.setAttribute('href',file);
        document.head.appendChild(link);
    }
    // 顺序依次加载外部的javascript文件
    function addScriptFile(file) {
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        script.setAttribute('src',file);
        script.async = false;// 同步执行，等待阻塞
        document.head.appendChild(script);
    }
    // 顺序依次加载外部绘图的svg文件
    function addSvgFile(file,id) {
        var svg = document.createElement('object');
        svg.setAttribute('id',id);
        svg.setAttribute('data',file);
        svg.setAttribute('type','image/svg+xml');
        svg.setAttribute('style','visibility:hidden;position:absolute;left:-100px;');
        document.body.appendChild(svg);
    }
    var debugMode,touchMode;
    debugMode = document.getElementById('loadScript').getAttribute('mode') === 'debug';
    touchMode = 'ontouchstart' in window || navigator.maxTouchPoints;
    var locale = {},localeParameter, extjsVersion, fontAwesomeVersion, olVersion, i, language, languages;
    window.Locale = locale;

    locale.languages = {
        'ar': { name: 'العربية', code: 'en' },
        'bg': { name: 'Български', code: 'bg' },
        'cs': { name: 'Čeština', code: 'cs' },
        'de': { name: 'Deutsch', code: 'de' },
        'da': { name: 'Dansk', code: 'da' },
        'el': { name: 'Ελληνικά', code: 'el' },
        'en': { name: 'English', code: 'en' },
        'es': { name: 'Español', code: 'es' },
        'fa': { name: 'فارسی', code: 'fa' },
        'fi': { name: 'Suomi', code: 'fi' },
        'fr': { name: 'Français', code: 'fr' },
        'he': { name: 'עברית', code: 'he' },
        'hi': { name: 'हिन्दी', code: 'en' },
        'hu': { name: 'Magyar', code: 'hu' },
        'id': { name: 'Bahasa Indonesia', code: 'id' },
        'it': { name: 'Italiano', code: 'it' },
        'ka': { name: 'ქართული', code: 'en' },
        'km': { name: 'ភាសាខ្មែរ', code: 'en' },
        'lo': { name: 'ລາວ', code: 'en' },
        'lt': { name: 'Lietuvių', code: 'lt' },
        'ml': { name: 'മലയാളം', code: 'en' },
        'ms': { name: 'بهاس ملايو', code: 'en' },
        'nb': { name: 'Norsk bokmål', code: 'no_NB' },
        'ne': { name: 'नेपाली', code: 'en' },
        'nl': { name: 'Nederlands', code: 'nl' },
        'nn': { name: 'Norsk nynorsk', code: 'no_NN' },
        'pl': { name: 'Polski', code: 'pl' },
        'pt': { name: 'Português', code: 'pt' },
        'pt_BR': { name: 'Português (Brasil)', code: 'pt_BR' },
        'ro': { name: 'Română', code: 'ro' },
        'ru': { name: 'Русский', code: 'ru' },
        'si': { name: 'සිංහල', code: 'en' },
        'sk': { name: 'Slovenčina', code: 'sk' },
        'sl': { name: 'Slovenščina', code: 'sl' },
        'sq': { name: 'Shqipëria', code: 'en' },
        'sr': { name: 'Srpski', code: 'sr' },
        'ta': { name: 'தமிழ்', code: 'en' },
        'th': { name: 'ไทย', code: 'th' },
        'tr': { name: 'Türkçe', code: 'tr' },
        'uk': { name: 'Українська', code: 'ukr' },
        'uz': { name: 'Oʻzbekcha', code: 'en' },
        'vi': { name: 'Tiếng Việt', code: 'en' },
        'zh': { name: '中文', code: 'zh_CN' }
    };
    // 根据请求参数或者浏览器语言设定判断使用的语言
    localeParameter = window.location.search.match(/locale=([^&#]+)/);
    locale.language = localeParameter &&localeParameter[1];
    if (!(locale.language in locale.languages)) {
        languages = window.navigator.languages !== undefined ? window.navigator.languages.slice() : [];
        language = window.navigator.userLanguage || window.navigator.language;

        languages.push(language);
        languages.push(language.substr(0,2));
        languages.push('en'); //default

        for (i = 0; i < languages.length; i++) {
            language = languages[i].replace('-', '_');
            if (language in locale.languages) {
                locale.language = language;
                break;
            }
        }
    }

})();