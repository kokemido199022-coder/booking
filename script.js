// ضع رقم واتساب بدون + مثال: 9665XXXXXXXX
const WHATSAPP_NUMBER = "966582088816";

let selected = {
  name: "",
  price: "",
  items: []
};

function waLink(message){
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function buildMessage(){
  const itemsText = selected.items.map(i => `- ${i}`).join("\n");
  return [
    "السلام عليكم،",
    "أرغب بالحجز من خلال الموقع.",
    "",
    `الباقة: ${selected.name}`,
    `السعر: ${selected.price} ريال`,
    "",
    "الخدمات داخل الباقة:",
    itemsText,
    "",
    "فضلاً أكدوا لي أقرب موعد متاح."
  ].join("\n");
}

function setChosenUI(){
  const title = document.getElementById("chosenTitle");
  const meta  = document.getElementById("chosenMeta");
  const book  = document.getElementById("bookNow");

  if (!selected.name){
    title.textContent = "اختر باقة للمتابعة";
    meta.textContent  = "سيتم تجهيز رسالة واتساب تلقائيًا.";
    book.href = waLink("السلام عليكم، أبغى استفسر عن الباقات المتاحة.");
    return;
  }

  title.textContent = `تم اختيار: ${selected.name}`;
  meta.textContent  = `السعر: ${selected.price} ريال — اضغط “احجز الآن” للواتساب.`;
  book.href = waLink(buildMessage());
}

function clearSelectedCards(){
  document.querySelectorAll(".package").forEach(card => {
    card.classList.remove("selected");
  });
}

document.querySelectorAll(".selectBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".package");
    const name = card.getAttribute("data-package");
    const price = card.getAttribute("data-price");

    const items = Array.from(card.querySelectorAll(".list li"))
      .map(li => li.textContent.trim())
      .filter(Boolean);

    selected = { name, price, items };

    clearSelectedCards();
    card.classList.add("selected");

    setChosenUI();
    card.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

setChosenUI();
