// Stoplight generates samples from the current host and token, but its cURL
// generator has no option for a gateway certificate without a trust anchor.
const gatewayAddressStorageKey = 'k40rf_gatewayAddress';

function updateGatewayAddressPersistence() {
  for (const input of document.querySelectorAll('input[aria-label="gatewayAddress"]')) {
    if (input.dataset.gatewayAddressPersistence === 'enabled') continue;
    input.dataset.gatewayAddressPersistence = 'enabled';

    input.addEventListener('input', () => {
      const address = input.value.trim();
      if (address) {
        localStorage.setItem(gatewayAddressStorageKey, address);
      } else {
        localStorage.removeItem(gatewayAddressStorageKey);
      }
    });

    const savedAddress = localStorage.getItem(gatewayAddressStorageKey);
    if (savedAddress && input.value !== savedAddress) {
      const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      valueSetter.call(input, savedAddress);
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

function updateCurlSamples() {
  for (const trigger of document.querySelectorAll('.HttpOperation [aria-label="Request Sample Language"]')) {
    const panel = trigger.closest('.sl-panel');
    const nativeCode = panel?.querySelector('pre.sl-code-viewer');
    const nativeCopy = panel?.querySelector('.sl-panel__titlebar button:not([aria-label="Request Sample Language"])');
    const titlebar = panel?.querySelector('.sl-panel__titlebar');
    const content = panel?.querySelector('.sl-panel__content');
    if (!nativeCode || !nativeCopy || !titlebar || !content) continue;

    const sample = nativeCode.getAttribute('aria-label') || '';
    const isCurl = trigger.textContent.includes('Shell / cURL') && /^curl\s/.test(sample);
    nativeCode.style.display = isCurl ? 'none' : '';
    nativeCopy.style.display = isCurl ? 'none' : '';

    let customCode = content.querySelector('.local-curl-code');
    let customCopy = titlebar.querySelector('.local-curl-copy');
    if (!isCurl) {
      customCode?.remove();
      customCopy?.remove();
      continue;
    }

    const curl = sample.includes('--insecure') ? sample : sample.replace(/^curl\b/, 'curl --insecure');
    if (!customCode) {
      customCode = document.createElement('pre');
      customCode.className = 'local-curl-code';
      content.append(customCode);
    }
    if (customCode.textContent !== curl) customCode.textContent = curl;

    if (!customCopy) {
      customCopy = document.createElement('button');
      customCopy.type = 'button';
      customCopy.className = 'local-curl-copy';
      customCopy.textContent = 'Kopieren';
      customCopy.setAttribute('aria-label', 'cURL mit --insecure kopieren');
      customCopy.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(panel.querySelector('.local-curl-code').textContent);
          customCopy.textContent = 'Kopiert';
          setTimeout(() => { customCopy.textContent = 'Kopieren'; }, 2000);
        } catch {
          customCopy.textContent = 'Kopieren fehlgeschlagen';
        }
      });
      titlebar.append(customCopy);
    }
  }
}

function updatePreview() {
  updateGatewayAddressPersistence();
  updateCurlSamples();
}

new MutationObserver(updatePreview).observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['aria-label'],
});
updatePreview();
