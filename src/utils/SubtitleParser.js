// SubtitleParser.js
import vttToJson from 'vtt-to-json'

const parseVtt = async (vttFile) => {
	const data = await vttToJson(vttFile)
	return data
}

export default parseVtt
