async function RenderProducts() {
    const response = await fetch('https://kitek.ktkv.dev/marketplace/api/items');
    const data = await response.json();
    const containerElement = document.getElementById("container-products");
    // data.forEach(item => {
    //     const div = document.createElement('div')
    //     div.className = 'item-card'
    //     div.innerHTML = item.title
    //     containerElement.appendChild(div)
    // })
    const cardsHtml = data.map((product) => `
<div class="item-card">
    <img src="${product.imageUrl}" alt="${product.title}"
        class="item-image" />
    <div class="item-content">
        <span class="status-badge status-active">${product.status}</span>
        <h3 class="item-title">${product.title}</h3>
        <p class="item-description">
            ${product.description}
        </p>
        <div class="item-footer">
            <div>
                <div class="item-price">${product.price}</div>
                <div class="bid-info">
                    ${product.highestBid}
                    <span class="bid-count">${product.bidCount}</span>
                </div>
            </div>
            <div class="item-meta">
                <span class="item-seller">
                    Продавец: ${product.username}
                </span>
            </div>
        </div>
    </div>
</div>
`
    ).join("")
    containerElement.innerHTML = cardsHtml
}
async function CalculateStats() {
    const response = await fetch('https://kitek.ktkv.dev/marketplace/api/items');
    const data = await response.json();
    const statValueElements = document.getElementsByClassName("stat-value")
    statValueElements[0].innerHTML = data.length
    let totalBids = 0
    let itemsWithBids = 0
    data.forEach((product) => {
        if (product.bidCount >= 1) {
            itemsWithBids += 1;
            totalBids += product.bidCount
        }
    });
    statValueElements[1].innerHTML = totalBids
    statValueElements[2].innerHTML = itemsWithBids
    let itemsCounter = 0
    let priceSum = 0
    // while(i < data.length) {
    //     priceSum += data[i].price
    //     i++
    // }
    data.forEach((product) => {
        itemsCounter += 1;
        priceSum += product.price
    });
    const averagePrice = Math.round(priceSum / itemsCounter);
    statValueElements[3].innerHTML = averagePrice
    console.log('Статистика:', { totalItems: data.length, totalBids, itemsWithBids, averagePrice })
}
CalculateStats();
RenderProducts();