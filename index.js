'use strict'
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const htmlToText = require('html-to-text')
const chordprojs = require('chordprojs')
const markdown = require('html-to-markdown')

const domain = 'https://hopamchuan.com'

// https://hopamchuan.com/song/6021/tinh-chua/?s=1

module.exports = {
    autocomplete: (query, callback) => {
        request.post(
            `${domain}/ajax/ajax_song/search_autocomplete`,
            { form: { keyword: query } },
            (error, response, body) => {
                if (error) {
                    callback(error, null, response, body)
                } else if (response.statusCode !== 200) {
                    callback(new Error('Bad response'))
                } else {
                    callback(body)
                }
            }
        )
    },
    get: (query, callback) => {
        request(`${domain}/song/${query}/`, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                let song = []
                const $ = cheerio.load(body, {
                    xmlMode: false,
                })

                let title = htmlToText.fromString($('#song-title').text())
                let chordPro = htmlToText.fromString(
                    $('#song-lyric .pre').text()
                )
                // let chord = htmlToText.fromString(
                //     chordprojs.parse(chordPro).render()
                // )
                let chord = markdown.convert(
                    chordprojs.parse(chordPro).render()
                )

                song.push({
                    title: title,
                    chordPro: chordPro,
                    chord: chord,
                })

                callback(song)
            }
        })
    },
}
