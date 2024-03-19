import { FC } from 'react'

// import { IFileUploadComponentProps } from './types'
export interface IFileUploadComponentProps {
    handleChange: (event: any) => void
}

const FileUPload: FC<IFileUploadComponentProps> = ({ handleChange }) => {
    return (
        <div>
            <div className="select-file">
                <input type="file" onChange={handleChange} />
            </div>
        </div>
    )
}

export default FileUPload
