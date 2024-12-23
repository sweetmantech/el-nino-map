import useShareMemories from '@/hooks/useShareMemories'
import Form from '../Form'
import Modal from '../Modal'
import { validation } from '@/lib/utils/memories_validation'
import Input from '../Input'
import TextArea from '../TextArea'
import Icon from '../Icon'

const MemoriesModal = ({ onClose }: { onClose: () => void }) => {
  const { url, setUrl, content, setContent } = useShareMemories()

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[584px] min-w-[400px] p-3 bg-white rounded-md" id="memories">
        <div className="flex gap-2 items-center pb-4">
          <Icon name="black-star" />
          <p className="font-bold">Share Your Imagination.</p>
        </div>
        <Form
          id="share-input"
          className="w-full space-y-3"
          validationSchema={validation}
          onSubmit={() => {}}
        >
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.instagram.com/p/..."
            label="Post URL"
            id="url"
            name="url"
            required
            hookToForm
          />
          <TextArea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            label="Tell us about your imagination"
            id="content"
            name="content"
            rows={3}
            hookToForm
          />
          <button
            className="w-full border border-grey rounded-md py-1 flex gap-2 items-center justify-center"
            type="submit"
          >
            <Icon name="black-star" />
            Share
          </button>
        </Form>
      </div>
    </Modal>
  )
}

export default MemoriesModal
