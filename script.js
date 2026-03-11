async function fetchData() {
    const data = await fetch('https://kitek.ktkv.dev/marketplace/api/items')
    const json = await data.json()
    const container = document.getElementById("container")

    const html = json.map((item) => `
<div class="item-card">
    <img src="${item.imageUrl}" alt="${item.title}"
        class="item-image" />
    <div class="item-content">
        <span class="status-badge status-active">${item.status}</span>
        <h3 class="item-title">${item.title}</h3>
        <p class="item-description">
            ${item.description}
        </p>
        <div class="item-footer">
            <div>
                <div class="item-price">${item.price}</div>
                <div class="bid-info">
                    ${item.highestBid}
                    <span class="bid-count">${item.bidCount}</span>
                </div>
            </div>
            <div class="item-meta">
                <span class="item-seller">
                    Продавец: ${item.username}
                </span>
            </div>
        </div>
    </div>
</div>
`
    ).join("")

    container.innerHTML = html

    const statvalue = document.getElementsByClassName("stat-value")
    
    statvalue[0].innerHTML = json.length

    let a = 0
    let b = 0
    json.forEach(index => {
        if (index.bidCount >= 1) {
            b += 1;
            a += index.bidCount
        }

    });
    statvalue[1].innerHTML = a
    statvalue[2].innerHTML = b

    let x = 0
    let y = 0
    let z = 0
    json.forEach(index => {
       
            x += 1;
            y += index.price
      

    });
    
    z =Math.round(y/x);
    
    statvalue[3].innerHTML = z




}

fetchData()