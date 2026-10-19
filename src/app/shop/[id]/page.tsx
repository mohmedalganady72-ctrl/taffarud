import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetails } from "@/components/shop/ProductDetails";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <><Navbar /><ProductDetails slug={id} /><Footer /></>;
}
