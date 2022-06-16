import React, { useEffect, useState } from 'react'
import { BrowserCodeReader, BrowserQRCodeReader } from '@zxing/browser'

export type QRScannerProps = {
  resultSetter: React.Dispatch<React.SetStateAction<string>>
}

export default function QRScanner (props: QRScannerProps) {
  // QR code reader.
  const reader = new BrowserQRCodeReader()

  // Video devices.
  const [selectedDevice, setSelectedDevice] = useState('')

  // Initialise video devices.
  useEffect(() => {
    const getVideos = async () =>
      BrowserCodeReader.listVideoInputDevices()
        .then(
          devices => setSelectedDevice(devices[0].deviceId)
        )
        .catch(err =>
          console.info(err)
        )

    getVideos()
  }, [])

  // Function to run the scanner.
  const runScanner = () => {
    // Reset the result.
    props.resultSetter('')

    // Read a new result.
    reader.decodeOnceFromVideoDevice(selectedDevice, 'scanner-preview')
      .then(result => props.resultSetter(result.getText()))
      .catch(console.info)
  }

  // Now actually read.
  useEffect(() => runScanner(), [selectedDevice])

  return (
    <div className="flex flex-col gap-4">
      <video id='scanner-preview' width='512' height='512' className="rounded-lg" />

      <button className="general-button place-self-center grow" onClick={runScanner}>
        RESET
      </button>
    </div>
  )
}