import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

export default function NotificationSystem() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [events, setEvents] = useState([
    { id: 1, name: "College Calendar", checked: false },
    { id: 2, name: "TY-ECE Time Table", checked: false },
    { id: 4, name: "Career Workshop", checked: false },
    { id: 5, name: "Hackathon", checked: false },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleEventToggle = (id: number) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, checked: !event.checked } : event
      )
    );
  };

  const handleSubscribe = () => {
    const subscribedEvents = events
      .filter((event) => event.checked)
      .map((event) => event.name);
    console.log(
      `Subscribed to ${subscribedEvents.join(
        ", "
      )} with phone number ${phoneNumber}`
    );
    // Here you would typically send this data to your backend
  };

  const exampleNotifications = [
    "📅 Reminder: Computer Science lecture tomorrow at 10 AM in Room 301",
    "🎉 Upcoming Event: Tech Fair this Friday from 2-5 PM in the Main Hall",
    "📚 Study Group: Algorithms & Data Structures, Thursday 7 PM, Library Room 2",
  ];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Student Notification System</CardTitle>
        <CardDescription>
          Subscribe to receive weekly WhatsApp updates about events and lectures
        </CardDescription>
      </CardHeader>
      <CardContent>
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-2">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
              <Button type="submit">Next</Button>
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">
                Example Notifications:
              </h3>
              <ul className="space-y-2">
                {exampleNotifications.map((notification, index) => (
                  <li key={index} className="text-sm bg-gray-100 p-2 rounded">
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold mb-2">
              Select events to subscribe:
            </h3>
            {events.map((event) => (
              <div key={event.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`event-${event.id}`}
                  checked={event.checked}
                  onCheckedChange={() => handleEventToggle(event.id)}
                />
                <label
                  htmlFor={`event-${event.id}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {event.name}
                </label>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        {step === 2 && (
          <Button onClick={handleSubscribe} className="w-full">
            Subscribe to Selected Events
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
