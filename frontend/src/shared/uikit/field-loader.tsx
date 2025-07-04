import ContentField from './content-field'
import Spinner from './spinner'

const FieldLoader = () => {
  return (
    <div className='relative'>
      <ContentField>
        <div className='flex justify-center items-center'>
          <div className='h-50' />
          <Spinner className='absolute left-1/2 top-1/2 -translate-1/2' />
        </div>
      </ContentField>
    </div>
  )
}

export default FieldLoader
