import { Channel, Members } from "pusher-js";
import { usePresenceStore } from "./usePresenceStore";
import { useCallback, useEffect, useRef } from "react";
import { pusherClient } from "@/lib/pusher";

export const usePresenceChannel = () => {
  const { set, add, remove } = usePresenceStore((state) => ({
    // not sure why we need to do it
    set: state.set,
    add: state.add,
    remove: state.remove,
  }));

  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      set(memberIds);
    },
    [set]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!channelRef.current) {
      // the 'presence' in the name must be like that so pusher knows it's a presence channel
      channelRef.current = pusherClient.subscribe("presence-nm");

      channelRef.current.bind(
        "pusher:subscription_succeeded",
        (members: Members) => {
          handleSetMembers(Object.keys(members.members));
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current && channelRef.current.subscribed) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "pusher:subscription_succeeded",
          handleSetMembers
        );
        channelRef.current.unbind("pusher:member_added", handleAddMember);
        channelRef.current.unbind("pusher:member_removed", handleRemoveMember);
      }
    };
  }, [handleAddMember, handleRemoveMember, handleSetMembers]);
};
