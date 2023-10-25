import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BadgeHelp, MoreVertical, Trash } from 'lucide-react';
import Button from '../../components/ui/Button';
import { Fragment } from 'react';
import { cn } from '../../lib/utils';
import { Badge } from '../../components/ui/Badge';
import { registerEvent } from '../../services/events-api';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ButtonLoadingText from '../../components/ui/ButtonLoadingText';

function EventActions({ isOwner, isAttending, eventId, userId, eventIsPast }) {
  const queryClient = useQueryClient();
  const [isRegistered, setIsRegistered] = useState();
  const { isLoading, mutate: register } = useMutation({
    mutationFn: registerEvent,
    onSuccess: () => {
      setIsRegistered(true);
      queryClient.invalidateQueries({ queryKey: ['events', eventId] });
    },
    onError: error => {
      toast.error(error.message);
    },
  });

  function handleAttending() {
    register({ user_id: userId, id: eventId });
  }

  //event is past and didnt attend
  let content;
  if (eventIsPast && !isAttending) {
    content = null;
  } else if (eventIsPast && isAttending) {
    content = <Badge variant="success">You attended</Badge>;
  } else if (!eventIsPast && !isAttending && !isRegistered) {
    content = (
      <Button
        type="button"
        className="md:self-start lg:ml-auto"
        onClick={handleAttending}
        disabled={isLoading}
      >
        {isLoading ? (
          <ButtonLoadingText loadingText="Registering..." />
        ) : (
          'I will be attending'
        )}
      </Button>
    );
  } else if (!eventIsPast && isAttending) {
    content = <Badge variant="success">Attending</Badge>;
  }

  // {!isAttending && !isRegistered ? (
  //   <Button
  //     type="button"
  //     className="md:self-start lg:ml-auto"
  //     onClick={handleAttending}
  //     disabled={isLoading}
  //   >
  //     {isLoading ? (
  //       <ButtonLoadingText loadingText="Registering..." />
  //     ) : (
  //       'Attending'
  //     )}
  //   </Button>
  // ) : (
  //   <Badge variant="success">Attending</Badge>
  // )}

  // event is past and attended

  //event isnt past and not attending

  // event isntpast and are attending

  return (
    <div className="md:self-start lg:ml-auto flex items-center gap-2">
      {content}
      {isOwner && (
        <Menu as="div" className="relative inline-block">
          <Menu.Button>
            <Button size="icon" variant="ghost" disabled={isLoading}>
              <MoreVertical className="w-6 h-6" />
            </Button>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-background dark:bg-secondary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="enquiries"
                      className={cn(
                        'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium gap-3',
                        active
                          ? 'bg-primary/10 text-primary'
                          : 'text-info-foreground'
                      )}
                    >
                      <BadgeHelp className="w-4 h-4" aria-hidden />
                      <span>Event enquries</span>
                    </Link>
                  )}
                </Menu.Item>
              </div>
              {!eventIsPast && (
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        role="button"
                        className={cn(
                          'group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium gap-3 cursor-pointer',
                          active
                            ? 'bg-primary/10 text-primary'
                            : 'text-info-foreground'
                        )}
                      >
                        <Trash
                          className="w-4 h-4 text-destructive"
                          aria-hidden
                        />
                        <span className="text-destructive">Delete</span>
                      </div>
                    )}
                  </Menu.Item>
                </div>
              )}
            </Menu.Items>
          </Transition>
        </Menu>
      )}
    </div>
  );
}

export default EventActions;
