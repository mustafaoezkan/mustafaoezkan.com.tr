/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';
import '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext';

describe('renders the app', () => {
  // mocks the fetch API used on the stats page and the about page.
  const jsonMock = jest.fn(() => Promise.resolve({}));
  const textMock = jest.fn(() => Promise.resolve(''));
  global.fetch = jest.fn(() => Promise.resolve({
    json: jsonMock,
    text: textMock,
  }));
  // mocks the scrollTo API used when navigating to a new page.
  window.scrollTo = jest.fn();
  // mocks the matchMedia API used by the theme provider.
  window.matchMedia = jest.fn(() => ({ matches: false }));
  // mocks the IntersectionObserver API used by scroll animations.
  global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  let container;
  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      await ReactDOM.createRoot(container).render(
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>,
      );
    });
  });
  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.clearAllMocks();
  });
  it('should render the app', async () => {
    expect(document.body).toBeInTheDocument();
  });
  it('should render the title', async () => {
    expect(document.title).toBe('Mustafa Ozkan');
  });
  it('can navigate to /about', async () => {
    expect.assertions(7);
    const aboutLink = document.querySelector(
      '#header > nav > ul > li:nth-child(1) > a',
    );
    expect(aboutLink).toBeInTheDocument();
    await act(async () => {
      await aboutLink.click();
    });
    expect(document.title).toContain('About Me |');
    expect(window.location.pathname).toBe('/about');
    expect(window.scrollTo).toHaveBeenNthCalledWith(1, 0, 0);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(jsonMock).toHaveBeenCalledTimes(0);
    expect(textMock).toHaveBeenCalledTimes(1);
  });
  it('can navigate to /resume', async () => {
    expect.assertions(3);
    const contactLink = document.querySelector(
      '#header > nav > ul > li:nth-child(2) > a',
    );
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Resume |');
    expect(window.location.pathname).toBe('/resume');
  });
});
