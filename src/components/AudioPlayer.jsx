// AudioPlayer.js
import React from 'react'
import ReactAudioPlayer from 'react-audio-player'

const AudioPlayer = ({ src, onTimeUpdate }) => {
	return <ReactAudioPlayer src={src} onListen={onTimeUpdate} controls />
}

export default AudioPlayer
