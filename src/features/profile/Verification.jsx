import Button from '../../components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/Card';
import FormControl from '../../components/ui/FormControl';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
const options = [
  { value: 'governor', label: 'Governor' },
  { value: 'senetaor', label: 'Senator' },
  { value: 'mp', label: 'Member Of Parliament(MP)' },
  { value: 'women-rep', label: 'Women Rep' },
  { value: 'mca', label: 'MCA' },
];
function Verification() {
  return (
    <main className="h-dvh flex items-center justify-center">
      <Card className="max-w-lg w-full ">
        <CardHeader>
          <CardTitle>Leader Verification</CardTitle>
          <CardDescription>
            You have chosen to sign up as a leader, as such we will need to
            verify this. Please upload the relevant certificates required as
            below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <FormControl label="Position" id="position">
              <Select
                options={options}
                id="position"
                placeholder="Select your position..."
              />
            </FormControl>
            <FormControl label="Certificate" id="certificate" error="">
              <Input id="certificate" type="file" />
              <span className="block text-xs text-muted-foreground">
                PNG, JPG or PDF (MAX. 1MB)
              </span>
            </FormControl>
            <div>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default Verification;
