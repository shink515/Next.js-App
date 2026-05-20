// 天気予報サイト 一覧画面

"use client"

import React from "react"
import { useState, useEffect } from "react"

// 画面遷移の機能を読み込み
import {useRouter} from "next/navigation"

// Jsonデータを受け入れる型を作成
type WeatherDescription = {
    publicTime: string
    publicTimeFormatted: string
    headlineText: string
    bodyText: string
    text: string
}

type WeatherForecasts = {
    date: string
    dateLabel: string
    telop: string
    temperature: {
        min: {
            celsius: string
            fahrenheit: string
        }
        max: {
            celsius: string
            fahrenheit: string
        }
    }
    ChanceOfRain: {
        T00_06: string
        T06_12: string
        T12_18: string
        T18_24: string
    }

    image: {
        title: string
        url: string
        width: number
        height: number
    }

}

type WeatherLocation = {
    area: string
    prefecture: string
    district: string
    city: string
}

type WeatherCopyright = {
    title: string
    link: string
    image: {
        title: string
        link: string
        url: string
        width: number
        height: number
    }
    provider: {
        link: string
        name: string
        note: string
    }[]
}

// 全ての型を集約する
type WeatherResponse = {
    description: WeatherDescription
    forecasts: WeatherForecasts[]
    location: WeatherLocation
    copyright: WeatherCopyright
}

// 画面を作成して返す関数
export default function WeatherViewPage() {

    // 画面遷移機能を変数に格納
    const router = useRouter()

    // 選択地域を格納するステートメント
    const [region, setRegion] = useState("130010")

    // 取得した天気情報を格納するステートメント
    const [weather, setWeather] = useState<WeatherResponse>()

    useEffect(() => {
        // WebAPIから天気情報を取得し、ステートメントに格納
        const fetchData = async () => {

            // 選択地域の天気情報を取得するリクエストを作成
            const url = `https://weather.tsukumijima.net/api/forecast?city=${region}`

            try {
                // 作成したリクエストを用いて、天気情報を取得
                const response = await fetch(url)

                // レスポンスからJsonデータを取得
                const json = await response.json()

                // 天気情報をステイトメントに格納
                setWeather(json)

            } catch {
                alert("データが見つかりませんでした。")
            }
        }

        fetchData();

    }, [region])

    // コンポーネント
    return (
        <div style={{ padding: "30px", fontFamily: "sans-serif", color: "#333", backgroundColor: "#fff", minHeight: "100vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px", borderBottom: "2px solid #3b82f6", paddingBottom: "15px", marginBottom: "25px" }}>
                <img src={weather?.copyright.image.url} alt="logo" style={{ height: "35px", objectFit: "contain" }} />
                <span style={{ fontSize: "22px", fontWeight: "bold", color: "#1e3a8a" }}>3日間お天気ナビ{" "}</span>
            </div>
            <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", display: "flex", alignItems: "center", gap: "20px", color: "#1e40af" }}>
                <div>🔷エリア別 3日間天気一覧</div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "bold", color: "#333" }}>
                    地域選択 :
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        style={{ padding: "6px 32px 6px 12px", fontSize: "14px", borderRadius: "6px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", cursor: "pointer", outline: "none" }}>
                        <option value="011000">道北（稚内）</option>
                        <option value="017010">道南（函館）</option>
                        <option value="017020">道南（江差）</option>
                        <option value="013010">道東（網走）</option>
                        <option value="016010">道央（札幌）</option>
                        <option value="020010">青森県</option>
                        <option value="030010">岩手県</option>
                        <option value="040010">宮城県</option>
                        <option value="050010">秋田県</option>
                        <option value="060010">山形県</option>
                        <option value="070010">福島県</option>
                        <option value="080010">茨城県</option>
                        <option value="090010">栃木県</option>
                        <option value="100010">群馬県</option>
                        <option value="110010">埼玉県</option>
                        <option value="120010">千葉県</option>
                        <option value="130010">東京都</option>
                        <option value="140010">神奈川県</option>
                        <option value="150010">新潟県</option>
                        <option value="160010">富山県</option>
                        <option value="170010">石川県</option>
                        <option value="180010">福井県</option>
                        <option value="190010">山梨県</option>
                        <option value="200010">長野県</option>
                        <option value="210010">岐阜県</option>
                        <option value="220010">静岡県</option>
                        <option value="230010">愛知県</option>
                        <option value="240010">三重県</option>
                        <option value="250010">滋賀県</option>
                        <option value="260010">京都府</option>
                        <option value="270000">大阪府</option>
                        <option value="280010">兵庫県</option>
                        <option value="290010">奈良県</option>
                        <option value="300010">和歌山県</option>
                        <option value="310010">鳥取県</option>
                        <option value="320010">島根県</option>
                        <option value="330010">岡山県</option>
                        <option value="340010">広島県</option>
                        <option value="350020">山口県</option>
                        <option value="360010">徳島県</option>
                        <option value="370010">香川県</option>
                        <option value="380010">愛媛県</option>
                        <option value="390010">高知県</option>
                        <option value="400010">福岡県</option>
                        <option value="410010">佐賀県</option>
                        <option value="420010">長崎県</option>
                        <option value="430010">熊本県</option>
                        <option value="440010">大分県</option>
                        <option value="450010">宮崎県</option>
                        <option value="460010">鹿児島県</option>
                        <option value="471010">沖縄県</option>
                    </select>
                </div>
            </div>
            <table border={1} style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                <thead>
                    <tr style={{ backgroundColor: "#eff6ff", color: "#1e3a8a" }}>
                        <th style={{ padding: "14px", fontWeight: "bold", border: "1px solid #e2e8f0", width: "16%", fontSize: "14px" }}>エリア名</th>
                        {weather?.forecasts?.map((item, index) => {
                            const [_, month, day] = item.date.split("-")

                            const convertDay = `${month}/${day}`

                            return (
                                <th key={index} style={{ padding: "14px", fontWeight: "bold", border: "1px solid #e2e8f0", width: "24%", fontSize: "14px" }}>{item.dateLabel}({convertDay})</th>
                            )

                        })}
                        <th style={{ padding: "14px", fontWeight: "bold", border: "1px solid #e2e8f0", width: "12%", fontSize: "14px" }}>詳細</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ transition: "background-color 0.2s" }}>

                        <td style={{ padding: "16px", border: "1px solid #e2e8f0", textAlign: "center", fontWeight: "bold", fontSize: "15px", backgroundColor: "#f8fafc" }}>
                            {weather?.location.prefecture}
                        </td>

                        {weather?.forecasts.map((item, index) => {

                            const max = item.temperature.max
                            const min = item.temperature.min

                            return (
                                <td key={index} style={{ padding: "16px", border: "1px solid #e2e8f0", textAlign: "center", verticalAlign: "middle" }}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                                        <img src={item.image.url} alt={item.telop} style={{ width: "60px", height: "auto", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}></img>
                                    </div>
                                    <div style={{ fontSize: "14px", fontWeight: "bold", marginBottom: "4px", textAlign: "center" }}>
                                        {max.celsius ? <span style={{ color: "#ef4444" }}>{max.celsius}℃</span> : ""}
                                        {max.celsius && min.celsius ? <span style={{ color: "#94a3b8", fontWeight: "normal", margin: "0 4px" }}>/</span> : ""}
                                        {min.celsius ? <span style={{ color: "#3b82f6" }}>{min.celsius}℃</span> : ""}</div>
                                    <div style={{ fontSize: "13px", color: "#475569", fontWeight: "500", textAlign: "center" }}>{item.telop}</div>
                                </td>
                            )

                        })}

                        <td style={{ padding: "16px", border: "1px solid #e2e8f0", textAlign: "center", verticalAlign: "middle" }}>
                            <button type="button" onClick={() => router.push(`/weather-detail?region=${region}`)} style={{ padding: "6px 16px", fontSize: "13px", fontWeight: "bold", color: "#fff", backgroundColor: "#3b82f6", border: "none", borderRadius: "4px", cursor: "pointer", transition: "background-color 0.2s", boxShadow: "0 2px 4px rgba(59,130,246,0.2)" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}>詳細</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
                <div className="flex items-center justify-center gap-1.5 text-gray-600 mb-3">
                    データ提供 : <a href={weather?.copyright.provider[0].link} className="text-blue-600 hover:underline font-medium">{weather?.copyright.provider[0].name}</a> |
                    システム提供 : <a href={weather?.copyright.link} className="text-blue-600 hover:underline font-medium">{weather?.copyright.title}</a>
                </div>
                <div className="max-w-xl mx-auto mb-3 text-[11px] text-gray-400 leading-relaxed">{weather?.copyright.provider[0].note}</div>
                <div className="font-medium text-gray-400">&copy; 2026 新里光貴 <br/> Copyright 2026 Koki Shinzato</div>
            </footer>
        </div>
    )

}