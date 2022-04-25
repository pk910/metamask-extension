import getFirstPreferredLangCode from '../../app/scripts/lib/get-first-preferred-lang-code';
import { setupLocale } from '../../ui';

let currentLocaleMessages, enLocaleMessages;

getFirstPreferredLangCode().then((preferredLocale) => {
  setupLocale(preferredLocale).then((response) => {
    currentLocaleMessages = response.currentLocaleMessages;
    enLocaleMessages = response.enLocaleMessages;
  });
});

const t = (key) => {
  let message;
  try {
    message = currentLocaleMessages[key].message;
  } finally {
    if (!message) {
      message = enLocaleMessages[key].message;
    }
  }
  return message;
};

export function getErrorHtml(error, supportLink) {
  return `
    <div class="critical-error-container">
      <div class="critical-error-div">
        ${t('troubleStarting')}        
      </div>
      <blockquote class="critical-error-bq">
        ${error.stack}
      </blockquote>
      <p class="critical-error-paragraph">    
        ${t('stillGettingMessage')}
        <a           
          href=${supportLink} 
          class="critical-error-anchor" 
          target="_blank" 
          rel="noopener noreferrer">
            ${t('sendBugReport')}
          </a>  
      </p>
    </div>
    `;
}
