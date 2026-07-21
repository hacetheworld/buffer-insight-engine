const analyzeBtn =
  document.getElementById("analyzeBtn");

const loading =
  document.getElementById("loading");

const results =
  document.getElementById("results");

analyzeBtn.addEventListener(
  "click",
  async () => {
    try {
      results.innerHTML = "";
      results.classList.add("hidden");

      loading.classList.remove("hidden");

      const response = await fetch(
        "http://localhost:3000/analyze",
        {
          method: "POST"
        }
      );

      const data = await response.json();

      loading.classList.add("hidden");

      results.classList.remove("hidden");

      results.innerHTML = `
      
      <div class="card">
        <h2>Executive Summary</h2>
        <p>${data.summary || "-"}</p>
      </div>

      <div class="card">
        <h2>Best Theme</h2>
        <p>${data.bestTheme || "-"}</p>
      </div>

      <div class="card">
        <h2>Best Posting Time</h2>
        <p>${data.bestPostingTime || "-"}</p>
      </div>

      <div class="card">
        <h2>Confidence</h2>
        <p>${data.confidence || "-"}</p>
      </div>

      <div class="card">
        <h2>Recommendations</h2>

        ${
          data.recommendations
            ?.map(
              (item) => `
              <div class="recommendation">
                <h3>${item.title}</h3>
                <p>${item.reason}</p>
              </div>
            `
            )
            .join("")
        }
      </div>

      <div class="card">
        <h2>Evidence</h2>

        <ul>
          ${
            data.evidence
              ?.map(
                (e) => `<li>${e}</li>`
              )
              .join("")
          }
        </ul>
      </div>

      <div class="card">
        <h2>Missed Opportunities</h2>

        <ul>
          ${
            data.missedOpportunities
              ?.map(
                (e) => `<li>${e}</li>`
              )
              .join("")
          }
        </ul>
      </div>
      `;
    } catch (err) {
      loading.classList.add("hidden");

      results.classList.remove("hidden");

      results.innerHTML = `
      <div class="card error">
        Failed to analyze content.
      </div>
      `;
    }
  }
);