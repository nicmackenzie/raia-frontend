import { useEffect, useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Progress } from '../../components/ui/Progress';
import { Link } from 'react-router-dom';
function Petition({
  id,
  title,
  petition_poster,
  topic,
  description,
  petition_count,
  target_signature,
}) {
  const [shortenedText, setShortenedText] = useState('');
  const percentage = Math.round(petition_count / target_signature);

  useEffect(
    function () {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = description;
      const textContent = tempElement.textContent || '';
      setShortenedText(textContent.substring(0, 120));
    },
    [description]
  );

  return (
    <div>
      <div className="overflow-hidden rounded-md shadow-md">
        <img
          src={petition_poster}
          className="w-full aspect-video max-h-40 object-cover"
          alt={`poster for ${title}`}
        />
        <div className="py-2 px-4">
          <Badge className="text-xs uppercase" size="sm">
            {topic}
          </Badge>
          <h3 className="text-xl md:text-2xl font-bold text-tertiary mt-1 mb-4">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground pb-2">
            {shortenedText}...{' '}
            <span className="text-blue-600 font-semibold">
              <Link to={`${id}`}>Read more</Link>
            </span>
          </p>
        </div>
        <footer className="bg-gold/10 px-6 py-4">
          <span className="text-sm text-primary inline-block font-semibold mb-1">
            {petition_count}/{target_signature}
          </span>
          <Progress value={percentage} background="bg-gold" />
        </footer>
      </div>
    </div>
  );
}

export default Petition;
