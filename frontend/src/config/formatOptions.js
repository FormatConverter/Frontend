const formatOptions = {
    wav: {
      codec: ["pcm_s16le", "pcm_s24le", "pcm_s32le"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    aiff: {
      codec: ["pcm_s16le", "pcm_s24le", "pcm_s32le"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    aac: {
      codec: ["aac", "aac_he_1", "aac_he_2"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    m4a: {
      codec: ["aac", "aac_he_1", "aac_he_2"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    mp3: {
      codec: ["mp3"],
      qscale: { min: 0, max: 9 },
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    flac: {
      codec: ["flac"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
    wma: {
      codec: ["wmav2"],
      bitrate: ["64k", "128k", "192k", "256k", "320k"],
      sampleRate: ["96000", "88200", "64000", "48000", "44100", "32000", "24000", "22050", "16000", "12000", "11025", "8000", "7350"],
      channel: [1, 2],
      volume: { min: 0.1, max: 10 },
    },
  };
  
  export default formatOptions;
  