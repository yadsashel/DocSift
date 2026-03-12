import { useToast } from "@/hooks/use-toast";

export const useApi = () => {
  const { toast } = useToast();

  const apiRequest = async (url: string, options: any) => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        // أي مشكل طرا فـ الـ Backend، هاد الـ Toast غايبان بوحدو
        toast({
          variant: "destructive",
          title: "Error",
          description: data.detail || "Connection failed",
        });
        return { error: true, data: null };
      }

      return { error: false, data };
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Network Error",
        description: "Please check your internet connection.",
      });
      return { error: true, data: null };
    }
  };

  return { apiRequest };
};