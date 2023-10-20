import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import { Textarea } from '../../components/ui/TextArea';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ChevronLeft } from 'lucide-react';
import { useMoveBack } from '../../hooks/use-move-back';

// eslint-disable-next-line react-refresh/only-export-components
export const topicOptions = [
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'finance', label: 'Finance' },
];

function CreateDiscussionForm() {
  const goBack = useMoveBack();
  return (
    <>
      <Button
        size="sm"
        variant="ghost"
        className="text-xs transition-all hover:text-primary"
        onClick={goBack}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>&nbsp;Back</span>
      </Button>
      <Card className="max-w-2xl mx-4 md:mx-auto mt-2">
        <CardHeader>
          <CardTitle>Start a Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="gap-6 relative space-y-3">
            <FormControl label="Topic" id="topic">
              <Select
                // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                id="topic"
                options={topicOptions}
                size="default"
                placeholder="Select Topic"
              />
            </FormControl>
            <FormControl label="Title" id="discussionTitle">
              <Input
                // variant={errors?.joiningAs ? 'destructive' : 'outline'}
                id="discussionTitle"
                options={topicOptions}
                size="default"
                placeholder="Title"
              />
            </FormControl>
            <FormControl label="Description" id="discussionDescription">
              <Textarea />
            </FormControl>
            <Button>Create discussion</Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default CreateDiscussionForm;
