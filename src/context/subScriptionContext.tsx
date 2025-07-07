import React, {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from 'react';
import { verifySubscriptionStatus } from '../components/utils/purchase';

interface SubscriptionContextProps {
    isSubscribed: boolean;
    autoRenewing: boolean;
    expiryDate: Date | null;
    refreshSubscription: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextProps>({
    isSubscribed: false,
    autoRenewing: false,
    expiryDate: null,
    refreshSubscription: async () => {},
});

interface ProviderProps {
    children: ReactNode;
}

export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [autoRenewing, setAutoRenewing] = useState(false);
    const [expiryDate, setExpiryDate] = useState<Date | null>(null);

    const refreshSubscription = async () => {
        const result = await verifySubscriptionStatus();
        let expiryDate =  result.expiryDate;
        console.log(result,"result");
        console.log( "Is SubScribed ? " ,result.isValid,"Expiry Date: ", expiryDate,"Auto Renewing: ",result.autoRenewing);
        setIsSubscribed(result.isValid);
        setExpiryDate(expiryDate ?? null);
        setAutoRenewing(result.autoRenewing ?? false);
    };

    useEffect(() => {
        refreshSubscription();
    }, []);

    return (
        <SubscriptionContext.Provider
            value={{
                isSubscribed,
                autoRenewing,
                expiryDate,
                refreshSubscription,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
};

export const useSubscription = () => {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
};