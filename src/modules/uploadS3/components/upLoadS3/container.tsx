import { FC } from 'react'

import axios from 'axios'

import FileUPloadComponent from './component'

// import { s3FileUploadService } from '../../../services'
// createApi

type TFileUploed = {
  fileKey: string
  filename: string
}

interface IFileUploadContainerProps {
  path: string
  onUploadFinish?: (data: TFileUploed) => void
}

// import { IFileUploadContainerProps } from './types'
import createApi from '../../api'
import { getAccessToken } from '@/shared/lib/auth'

export const FileUPload: FC<IFileUploadContainerProps> = ({ path, onUploadFinish }) => {

  const api = createApi(getAccessToken());
    
    const presignedUrl = async (filename: string, path: string) => {
        console.log(filename, path);
        return await api.apis3.get({ 
           params: {
            objectName: filename,
            path,
           }
        })
    }


    const handleChange = (event: any) => {
        if (event.target.files.length) {
            const file: File = event.target.files[0]
            const filename = file.name

            presignedUrl(filename, path).then(async ({ signedUrl, fileKey, filename }) => {
                await axios.put(signedUrl, file).then(() => {
                    if (onUploadFinish) onUploadFinish({ fileKey, filename })
                })
            })
        }
    }

    return <FileUPloadComponent handleChange={handleChange} />
}

// export default FileUPload
