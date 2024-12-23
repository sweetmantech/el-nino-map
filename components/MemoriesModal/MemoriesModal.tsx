import useShareMemories from '@/hooks/useShareMemories'
import Form from '../Form'
import Modal from '../Modal'
import { validation } from '@/lib/utils/memories_validation'
import Input from '../Input'
import TextArea from '../TextArea'

const MemoriesModal = ({ onClose }: { onClose: () => void }) => {
  const { url, setUrl, content, setContent } = useShareMemories()

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md" id="memories">
        <p className="font-bold pb-4">Share Your Information.</p>
        <Form
          id="share-input"
          className="w-full space-y-3"
          validationSchema={validation}
          onSubmit={() => {}}
        >
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            label="Post URL"
            id="url"
            name="url"
            required
            hookToForm
          />
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Tell  us about your information."
            id="content"
            name="content"
            rows={3}
            hookToForm
          />
          <button className="w-full border border-grey rounded-md py-1" type="submit">
            Share
          </button>
        </Form>
      </div>
    </Modal>
  )
}

export default MemoriesModal
