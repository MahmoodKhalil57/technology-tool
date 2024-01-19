export const browserEval = <T>(command: string): Promise<T> =>
  new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined") {
      chrome.devtools.inspectedWindow.eval(command, (result, isException) => {
        if (isException) {
          reject(isException);
        }
        // @ts-ignore
        resolve(result as T);
      });
    } else {
      // reject("chrome is undefined");
      // @ts-ignore
      resolve("chrome is undefined" as T);
    }
  });

export const addListener = {
  onMessage: (
    fn: (
      ...params: Parameters<
        Parameters<typeof chrome.runtime.onMessage.addListener>[0]
      >
    ) => ReturnType<typeof chrome.runtime.onMessage.addListener>
  ) => {
    if (typeof chrome !== "undefined") {
      chrome.runtime.onMessage.addListener(fn);
    }
  },
  onSelectionChanged: (
    fn: (
      ...params: Parameters<
        Parameters<
          typeof chrome.devtools.panels.elements.onSelectionChanged.addListener
        >[0]
      >
    ) => ReturnType<
      typeof chrome.devtools.panels.elements.onSelectionChanged.addListener
    >
  ) => {
    if (typeof chrome !== "undefined") {
      chrome.devtools.panels.elements.onSelectionChanged.addListener(fn);
    }
  },
  onReload: (
    fn: (
      ...params: Parameters<
        Parameters<typeof chrome.tabs.onUpdated.addListener>[0]
      >
    ) => ReturnType<typeof chrome.tabs.onUpdated.addListener>
  ) => {
    if (typeof chrome !== "undefined") {
      chrome.tabs.onUpdated.addListener(fn);
    }
  },
};
