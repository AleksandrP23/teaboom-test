// Цены в копейках: расчёт выгоды без дробной арифметики.
const variants = {
  100: { sku: '01306', price: 32640, oldPrice: 34920 },
  500: { sku: '01307', price: 143200, oldPrice: 164600 },
  1000: { sku: '01308', price: 206400, oldPrice: 259200 },
  5000: { sku: '01309', price: 632000, oldPrice: 871000 },
};

const rublesFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const kopecksFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatMoney(kopecks) {
  const formatter = kopecks % 100 === 0 ? rublesFormatter : kopecksFormatter;
  return formatter.format(kopecks / 100);
}

export function initProduct(product = document.querySelector('.product')) {
  if (!product) return;

  const form = product.querySelector('.purchase');
  const price = product.querySelector('#price');
  const oldPrice = product.querySelector('#old-price');
  const sku = product.querySelector('#sku');
  const savings = product.querySelector('#savings');

  if (!form || !price || !oldPrice || !sku || !savings) return;

  function updateVariant() {
    const selectedWeight = form.querySelector('input[name="weight"]:checked');
    if (!selectedWeight || !Object.hasOwn(variants, selectedWeight.value)) return;

    const variant = variants[selectedWeight.value];
    price.textContent = formatMoney(variant.price);
    oldPrice.textContent = formatMoney(variant.oldPrice);
    sku.textContent = variant.sku;
    savings.textContent = formatMoney(variant.oldPrice - variant.price);
  }

  form.addEventListener('change', (event) => {
    if (event.target.matches('input[type="radio"][name="weight"]')) {
      updateVariant();
    }
  });

  // Восстановление выбранной фасовки при возвращении на страницу.
  window.addEventListener('pageshow', updateVariant);
  updateVariant();
}
