
import { useQuery } from '@tanstack/react-query';
import API from '../api/axiosConfig';

// vendor - side bar badge (unread)
export const useVendorUnreadCount = (vendorId) => {
    return useQuery({
        queryKey: ['vendorUnread', vendorId],
        queryFn: async () => {
            const { data } = await API.get(`/message/vendor-messages/${vendorId}`);
            const chats = data.data || [];
            const total = chats.reduce((sum, chat) => {
                // plain object access, not Map.get()
                const count = chat.unreadCount?.[vendorId] || 0;
                return sum + count;
            }, 0);
            return total;
        },
        enabled: !!vendorId,
        staleTime: 1000 * 30
    });
};