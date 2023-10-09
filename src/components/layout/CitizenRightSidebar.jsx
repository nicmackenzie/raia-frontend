import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
function CitizenRightSidebar() {
  return (
    <div className="hidden lg:inline-flex lg:flex-col gap-y-4 w-1/4 ">
      <Card className="w-full h-max">
        <CardHeader className="p-2">
          <CardTitle className="text-base">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-xs text-muted-foreground">
            No upcoming events
          </p>
        </CardContent>
      </Card>
      <Card className="w-full h-max">
        <CardHeader className="p-2">
          <CardTitle className="text-base">Popular discussions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-xs text-muted-foreground">
            No discussions
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default CitizenRightSidebar;
