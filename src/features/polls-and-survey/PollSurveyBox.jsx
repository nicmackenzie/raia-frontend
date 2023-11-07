import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/Tab';
import Polls from './Polls';

function PollSurveyBox() {
  return (
    <div className="space-y-3 m-4">
      <Tabs defaultValue="polls" className="w-full">
        <TabsList className="grid w-max grid-cols-2">
          <TabsTrigger value="polls">Polls</TabsTrigger>
          <TabsTrigger value="survey">Survey</TabsTrigger>
        </TabsList>
        <TabsContent value="polls">
          <Polls />
        </TabsContent>
        <TabsContent value="survey">
          <h1 className="bg-red-300">survey</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PollSurveyBox;
