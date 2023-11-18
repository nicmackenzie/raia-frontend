import pdfSvg from '../../assets/pdf-svg.svg';
import { cn } from '../../lib/utils';
function Resource({ resource_url, description }) {
  const isPdf = resource_url.split('.').pop() === 'pdf';
  return (
    <div className="pb-2 border-b">
      <a href={resource_url} target="_blank" rel="noopener noreferrer">
        <img
          src={!isPdf ? resource_url : pdfSvg}
          alt={description}
          width={!isPdf ? 640 : 512}
          height={!isPdf ? 360 : 512}
          className={cn(
            'block rounded-md object-cover',
            isPdf ? 'w-24 h-24 aspect-square' : 'w-72 aspect-video h-auto  '
          )}
        />
      </a>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default Resource;
