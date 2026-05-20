// 天気予報サイト 詳細画面

"use client"

import React from "react"
import { useState, useEffect } from "react"

// 一覧画面へ戻るため使用
import { useRouter } from "next/navigation"

// 転送されたパラメーターを受け取る機能
import { useSearchParams } from "next/navigation"

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
    chanceOfRain: {
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
    }
}

// 全ての型を集約する
type WeatherResponse = {
    description: WeatherDescription
    forecasts: WeatherForecasts[]
    location: WeatherLocation
    copyright: WeatherCopyright
}

// 天気詳細画面を作成して返す関数
export default function WeatherDetailPage() {

    const router = useRouter()

    // 取得した天気情報を格納するステートメント
    const [weather, setWeather] = useState<WeatherResponse>()

    // 一覧画面から転送されたパラメーター（ステイトメント）を取得
    const param = useSearchParams()

    // 日付ごと情報切り替え用
    const [dateNumber, setDateNumber] = useState(0)

    // ステイトメント内の地域IDを取得
    const region = param.get("region")


    useEffect(() => {
        const fetchData = async () => {

            // 一覧画面から転送された地域IDで再フェッチ
            const response = await fetch(`https://weather.tsukumijima.net/api/forecast/city/${region}`)

            // レスポンスからjsonデータを取得
            const json = await response.json()

            setWeather(json)

        }

        fetchData()

    }, [])

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen text-gray-800">

            <div className="text-xl font-bold text-blue-900 border-b-2 border-blue-500 pb-3 mb-6 flex items-center gap-2">
            <button
                type="button"
                onClick={() => router.push("/weather-view")}
                className="inline-flex items-center justify-center px-4 py-1.5 ml-auto text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-lg shadow-sm transition-all order-last">一覧画面へ戻る
            </button>

                📍{weather?.location.prefecture}({weather?.location.district})の詳細情報
            </div>

            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4">
                {weather?.forecasts.map((item, index) => {

                    const [year, month, day] = item.date.split("-")

                    const convertDay = `${month}/${day}`

                    // 選択されているかどうかの判定
                    // ラムダ式の繰り返し番号と、それを格納したステイトメントの値が等しいかどうか
                    const isActive = dateNumber === index

                    return (
                        <button type="button" name="dataSelect" key={index} onClick={() => setDateNumber(index)} 
                                className={`flex-1 py-3 px-4 rounded-xl border transition-all text-center ${
                                isActive
                                    ? "bg-blue-600 text-white border-blue-600 font-bold shadow-sm"
                                    : "bg-blue-50/50 text-blue-900 border-blue-100 hover:bg-blue-50"
                            }`}
                        >
                            <span className="text-sm block mb-0.5">{item.dateLabel}</span>
                            <span className={`text-base ${isActive ? "text-white" : "text-gray-500"}`}>{convertDay}</span>
                        </button>
                    )
                })}
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm mb-8">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-blue-50 text-blue-900 font-bold text-sm border-b border-gray-200">
                            <th className="py-3 px-4 font-bold text-left bg-blue-100/50 w-1/5">時間帯</th>
                            <th className="py-3 px-2 font-medium">00:00 ~ 06:00</th>
                            <th className="py-3 px-2 font-medium">06:00 ~ 12:00</th>
                            <th className="py-3 px-2 font-medium">12:00 ~ 18:00</th>
                            <th className="py-3 px-2 font-medium">18:00 ~ 24:00</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-gray-700 bg-white hover:bg-gray-50/50 transition-colors">
                            <td className="py-4 px-4 font-bold text-left bg-gray-50/50 text-gray-900 border-r border-gray-100">降水確率(%)</td>
                            <td className="py-4 px-2 text-base font-semibold">{weather?.forecasts[dateNumber].chanceOfRain.T00_06}</td>
                            <td className="py-4 px-2 text-base font-semibold">{weather?.forecasts[dateNumber].chanceOfRain.T06_12}</td>
                            <td className="py-4 px-2 text-base font-semibold">{weather?.forecasts[dateNumber].chanceOfRain.T12_18}</td>
                            <td className="py-4 px-2 text-base font-semibold">{weather?.forecasts[dateNumber].chanceOfRain.T18_24}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="text-sm font-bold text-blue-900 mb-3 flex items-center gap-1.5">
                    <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                    概状（テキスト予報）
                </div>
                <div className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                    {weather?.description.bodyText}
                </div>
            </div>

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