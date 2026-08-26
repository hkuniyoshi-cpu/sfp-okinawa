(function () {
  'use strict';
  const BOT_PATTERNS = [
    /googlebot/i, /bingbot/i, /yahoo!\s*slurp/i, /duckduckbot/i,
    /baiduspider/i, /yandexbot/i, /sogou/i, /exabot/i, /facebot/i, /ia_archiver/i,
    /chatgpt-user/i, /gptbot/i, /claudebot/i, /claude-web/i, /anthropic-ai/i,
    /perplexitybot/i, /perplexity\.ai/i, /you\.com/i, /bytespider/i,
    /amazonbot/i, /applebot/i,
    /facebookexternalhit/i, /twitterbot/i, /linkedinbot/i, /slackbot/i,
    /discordbot/i, /telegrambot/i, /line-poker/i, /whatsapp/i,
    /ahrefsbot/i, /semrushbot/i, /mj12bot/i, /dotbot/i,
    /bot/i, /crawler/i, /spider/i, /scraper/i,
  ];
  function isBotOrAI() {
    if (typeof navigator === 'undefined') return false;
    const ua = (navigator.userAgent || '').toString();
    return BOT_PATTERNS.some(re => re.test(ua));
  }
  function enforceJaLang() {
    try {
      if (isBotOrAI() && document && document.documentElement) {
        document.documentElement.setAttribute('lang', 'ja');
      }
    } catch (e) {}
  }
  enforceJaLang();
  window.__SEO_BOT__ = { isBot: isBotOrAI() };
})();
