type Props = {
  rating: number;
};

export default function StarRating({
  rating,
}: Props) {
  return (
    <div className="flex gap-1 text-yellow-500 text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}