import { onNavigate } from '$app/navigation';

const apiSupported = 'startViewTransition' in document;
if (apiSupported) {
onNavigate((navigation) => {
  return new Promise((resolve) => {
    document.startViewTransition(async () => {
      resolve();
      await navigation.complete;
    });
  });
});
}