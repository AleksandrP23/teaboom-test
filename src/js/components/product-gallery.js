import 'fslightbox';

export function initProductGallery() {
  const trigger = document.querySelector('[data-fslightbox="product-gallery"]');
  const gallery = window.fsLightboxInstances['product-gallery'];
  if (!trigger || !gallery) return;

  gallery.props.useDialog = true;
  gallery.props.onSourceLoad = (instance, source) => {
    source.alt = trigger.querySelector('img').alt;
  };
  gallery.props.onClose = () => trigger.focus();
}
