// A lightweight, browser-side implementation mimicking Puppeteer for self-testing
export interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'passed' | 'failed';
  logs: string[];
  duration?: number;
  error?: string;
}

export type TestAction = (log: (msg: string) => void) => Promise<void>;

export interface TestScenario {
  id: string;
  name: string;
  action: TestAction;
}

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to simulate Puppeteer's waitForSelector
const waitForSelector = async (selector: string, timeout = 2000): Promise<Element> => {
  const startTime = Date.now();
  while (Date.now() - startTime < timeout) {
    const element = document.querySelector(selector);
    if (element) return element;
    await delay(100);
  }
  throw new Error(`Timeout waiting for selector: ${selector}`);
};

// Test Suite Definition
export const TEST_SUITE: TestScenario[] = [
  {
    id: 'homepage-sanity',
    name: 'Homepage Critical Elements',
    action: async (log) => {
      log('Navigating to Homepage...');
      window.location.hash = ''; // Force home
      await delay(1000);

      log('Checking Hero Slider...');
      await waitForSelector('section.relative.w-full');
      log('Hero Slider found.');

      log('Verifying Brand Name...');
      const brand = document.body.innerText.includes('AsanSka University');
      if (!brand) throw new Error('Brand name not found on page');
      log('Brand name verified.');

      log('Checking Call-to-Action buttons...');
      await waitForSelector('a[href*="portal.aucdt.edu.gh"]');
      log('Admission Portal link confirmed.');
    }
  },
  {
    id: 'theme-toggle',
    name: 'Theme Switching Functionality',
    action: async (log) => {
      log('Locating Theme Toggle...');
      // Note: We need a reliable selector. Assuming the generic button structure from ThemeToggle component.
      // We might need to look for aria-labels.
      
      const darkModeBtn = document.querySelector('button[aria-label="Switch to Dark Mode"]') as HTMLElement;
      if (!darkModeBtn) throw new Error('Dark mode button not found');
      
      log('Activating Dark Mode...');
      darkModeBtn.click();
      await delay(500);
      
      if (!document.documentElement.classList.contains('dark')) {
        throw new Error('Dark mode class not applied to HTML element');
      }
      log('Dark mode active.');
      
      log('Reverting to Light Mode...');
      const lightModeBtn = document.querySelector('button[aria-label="Switch to Light Mode"]') as HTMLElement;
      if (!lightModeBtn) throw new Error('Light mode button not found');
      
      lightModeBtn.click();
      await delay(500);
      
      if (document.documentElement.classList.contains('dark')) {
        throw new Error('Failed to remove dark mode class');
      }
      log('Light mode restored.');
    }
  },
  {
    id: 'chat-agent',
    name: 'AI Agent Interaction Journey',
    action: async (log) => {
      // Ensure chat is closed initially
      const closeBtn = document.querySelector('button[title="Close chat"]') as HTMLElement;
      if (closeBtn) {
        log('Closing existing chat session...');
        closeBtn.click();
        await delay(500);
      }

      log('Opening Chat Agent...');
      const chatToggle = document.querySelector('button[aria-label="Open AI Chat Assistant"]') as HTMLElement;
      if (!chatToggle) throw new Error('Chat toggle button not found');
      chatToggle.click();
      
      log('Waiting for Chat Interface...');
      await waitForSelector('input[placeholder="Ask a question..."]');
      log('Chat input detected.');

      log('Verifying Welcome Message...');
      await delay(500); // Allow render
      const messages = document.body.innerText;
      if (!messages.includes('Nkyinkyim')) {
        throw new Error('Welcome message identifying "Nkyinkyim" not found');
      }
      log('Persona "Nkyinkyim" verified.');

      log('Closing Chat...');
      const closeChatBtn = document.querySelector('button[title="Close chat"]') as HTMLElement;
      if (!closeChatBtn) throw new Error('Close button missing');
      closeChatBtn.click();
      log('Chat closed successfully.');
    }
  },
  {
    id: 'admin-security',
    name: 'Admin Route & Security Check',
    action: async (log) => {
      log('Navigating to Admin Portal...');
      window.location.hash = 'admin';
      await delay(1000);

      log('Checking for Lock Screen...');
      await waitForSelector('input[type="password"]');
      log('Password input found.');

      log('Attempting Invalid Login (Security Test)...');
      const input = document.querySelector('input[type="password"]') as HTMLInputElement;
      const submit = document.querySelector('button[type="submit"]') as HTMLElement;
      
      // Use React's property setter to ensure state update if needed, or simple direct value
      // Since this is a "Puppeteer-like" external interaction, we set value and dispatch event
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
      nativeInputValueSetter?.call(input, 'wrongpassword123');
      input.dispatchEvent(new Event('input', { bubbles: true }));
      
      await delay(200);
      submit.click();
      await delay(500);

      const errorMsg = document.body.innerText.includes('Invalid password') || document.body.innerText.includes('failed');
      if (!errorMsg) throw new Error('Security bypass: Invalid password did not trigger error');
      log('Security Check Passed: Access Denied.');
      
      log('Returning to Home...');
      window.location.hash = '';
    }
  }
];