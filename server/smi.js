const { exec } = require('child_process')
const { parseString: xml } = require('xml2js')

const NVIDIA_SMI_BIN =
  process.env.NVIDIA_SMI_BIN ||
  'C:/Program Files/NVIDIA Corporation/NVSMI/nvidia-smi.exe'

module.exports = function(callback) {
  exec(`"${NVIDIA_SMI_BIN}" -q -x`, function(err, stdout, stderr) {
    if (err) {
      return callback(err)
    }
    if (stderr) {
      return callback(stderr)
    }

    const options = { explicitArray: false, trim: true }

    xml(stdout, options, function(err, data) {
      if (err) {
        return callback(err)
      }

      return callback(null, data)
    })
  })
}
