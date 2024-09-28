document.addEventListener("DOMContentLoaded", function() {
	const citySelect = document.getElementById("city-select");
	const getWeatherButton = document.getElementById("get-weather");

	getWeatherButton.addEventListener("click", async function() {
		const selectedCity = citySelect.value;

		if (!selectedCity) {
			alert("都市を選択してください");
			return;
		}

		const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${selectedCity}.json`;
		try {
			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("ネットワークエラーが発生しました");
			}
			const data = await response.json();
			displayWeatherData(data);
		} catch (error) {
			console.error(error);
			alert("天気データの取得に失敗しました");
		}
	});

	function displayWeatherData(data) {
		console.log(data); // デバッグ用にデータをコンソールに出力

		// 発表者の取得
		document.getElementById("publishingOffice").children[1].textContent = data[0].publishingOffice;

		// 報告日時の取得
		document.getElementById("reportDatetime").children[1].textContent = data[0].reportDatetime;

		// 対象地域の取得
		document.getElementById("targetArea").children[1].textContent = data[0].timeSeries[0].areas[0].area.name;

		// 今日の天気の取得
		const todayWeather = data[0].timeSeries[0].areas[0].weathers[0];
		if (todayWeather) {
			document.getElementById("today").children[1].textContent = todayWeather;
		} else {
			document.getElementById("today").children[1].textContent = "データなし";
		}

		// 明日の天気の取得
		const tomorrowWeather = data[0].timeSeries[0].areas[0].weathers[1];
		if (tomorrowWeather) {
			document.getElementById("tomorrow").children[1].textContent = tomorrowWeather;
		} else {
			document.getElementById("tomorrow").children[1].textContent = "データなし";
		}

		// 明後日の天気の取得
		const dayAfterTomorrowWeather = data[0].timeSeries[0].areas[0].weathers[2];
		if (dayAfterTomorrowWeather) {
			document.getElementById("dayAfterTomorrow").children[1].textContent = dayAfterTomorrowWeather;
		} else {
			document.getElementById("dayAfterTomorrow").children[1].textContent = "データなし";
		}

		// 今日の最高気温と最低気温の取得
		const tempInfo = data[1].tempAverage.areas[0];
		if (tempInfo) {
			// 今日の最高気温
			document.getElementById("todayHighTemperature").children[1].textContent = tempInfo.max + "℃";

			// 今日の最低気温
			document.getElementById("todayLowTemperature").children[1].textContent = tempInfo.min + "℃";
		} else {
			document.getElementById("todayHighTemperature").children[1].textContent = "データなし";
			document.getElementById("todayLowTemperature").children[1].textContent = "データなし";
		}
	}
});
