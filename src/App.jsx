// App.js
import { useState, useEffect } from 'react'

import ReactAudioPlayer from 'react-audio-player'

const subtitleArray = [
	{
		id: 1,
		startTime: '00:00:00.000',
		endTime: '00:00:02.280',
		subtitle: 'Hello and welcome to Complete Spanish.',
	},

	{
		id: 2,
		startTime: '00:00:02.280',
		endTime: '00:00:04.400',
		subtitle: 'We’re really excited about this new material,',
	},

	{
		id: 3,
		startTime: '00:00:04.400',
		endTime: '00:00:07.160',
		subtitle: 'Language Transfer’s first complete course,',
		audioPause: true,
	},

	{
		id: 4,
		startTime: '00:00:07.160',
		endTime: '00:00:10.920',
		subtitle:
			'which is all you need to become a master self-directed language learner',
	},

	{
		id: 5,
		startTime: '00:00:10.920',
		endTime: '00:00:14.280',
		subtitle: 'and steer yourself to fluency through practice of,',
	},

	{
		id: 6,
		startTime: '00:00:14.280',
		endTime: '00:00:15.400',
		subtitle: 'and exposure to,',
		audioPause: true,
	},

	{
		id: 7,
		startTime: '00:00:15.400',
		endTime: '00:00:16.160',
		subtitle: 'Spanish;',
	},

	{
		id: 8,
		startTime: '00:00:16.160',
		endTime: '00:00:19.800',
		subtitle: 'enjoying the fascinating journey of delving into language.',
	},

	{
		id: 9,
		startTime: '00:00:19.800',
		endTime: '00:00:21.200',
		subtitle: 'Right after the first hour,',
	},
	{
		id: 10,
		startTime: '00:00:21.200',
		endTime: '00:00:21.400',
		subtitle: 'Audio Paused',
		audioPause: true,
	},
	{
		id: 11,
		startTime: '00:00:21.400',
		endTime: '00:00:24.560',
		subtitle: 'you will be and feel like a Spanish speaker.',
	},
]

const App = () => {
	const audioSrc = 'src/assets/01 Lesson 1.mp3'
	const [currentSubtitle, setCurrentSubtitle] = useState('')
	const [pauseTimestamps, setPauseTimestamps] = useState([])

	useEffect(() => {
		const audioPlayer = document.getElementById('audio-player')

		const handleListen = () => {
			const currentTime = audioPlayer.currentTime
			const currentSubtitleObj = subtitleArray.find(
				(subtitle) =>
					currentTime >= parseTime(subtitle.startTime) &&
					currentTime <= parseTime(subtitle.endTime)
			)

			// Check for the audioPause key and its value
			if (currentSubtitleObj && currentSubtitleObj.audioPause) {
				const timestamp = parseTime(currentSubtitleObj.startTime)

				// Check if the timestamp is not already in the array
				if (!pauseTimestamps.includes(timestamp)) {
					setPauseTimestamps((prevTimestamps) => [...prevTimestamps, timestamp])
					audioPlayer.pause()
				}
			}

			// Update the current subtitle
			if (currentSubtitleObj) {
				setCurrentSubtitle(currentSubtitleObj.subtitle)
			} else {
				setCurrentSubtitle('')
			}
		}

		const handleSeeked = () => {
			const currentTime = audioPlayer.currentTime

			// Clear the pauseTimestamps array when the user seeks to a new position
			setPauseTimestamps([])

			// Check if there's a subtitle with an audioPause flag at the current time
			const currentSubtitleObj = subtitleArray.find(
				(subtitle) =>
					currentTime >= parseTime(subtitle.startTime) &&
					currentTime <= parseTime(subtitle.endTime)
			)

			// Pause the audio if there's an audioPause flag
			if (currentSubtitleObj && currentSubtitleObj.audioPause) {
				audioPlayer.pause()
			}
		}

		// Add event listener for time updates
		audioPlayer.addEventListener('timeupdate', handleListen)

		// Add event listener for seeking updates
		audioPlayer.addEventListener('seeked', handleSeeked)

		// Clean up the event listeners when the component unmounts
		return () => {
			audioPlayer.removeEventListener('timeupdate', handleListen)
			audioPlayer.removeEventListener('seeked', handleSeeked)
		}
	}, [pauseTimestamps])

	const parseTime = (timeString) => {
		return new Date('1970-01-01T' + timeString + 'Z').getTime() / 1000
	}

	return (
		<div>
			<ReactAudioPlayer id='audio-player' src={audioSrc} controls />
			<div>{currentSubtitle && <p>{currentSubtitle}</p>}</div>
		</div>
	)
}

export default App
