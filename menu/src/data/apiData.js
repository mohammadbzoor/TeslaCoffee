export const fetchData = async (setItemsData, category = "burgers") => {
  try {
    const baseUrl = "https://free-food-menus-api-two.vercel.app";
    const endpoint = category === "all" ? `${baseUrl}/burgers` : `${baseUrl}/${category}`;

    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("فشل في الاتصال بالخادم");

    const data = await res.json();

    const formatted = data.map((item) => ({
      title: item.name,
      description: item.dsc || item.name || "وصف غير متوفر",
      imgUrl: item.img || "https://via.placeholder.com/300x300?text=No+Image",
      oldPrice: ((item.price ?? 59) + 5).toFixed(2),
      newPrice: (item.price ?? 59).toFixed(2),
    }));

    setItemsData(formatted);
  } catch (error) {
    console.error("⚠️ Fetch error:", error);
    setItemsData([]); // تفريغ البيانات في حال الخطأ
  }
};
