import Link from "next/link";

export const ButtonAllProjects = () => {
  return (  
    <div style={{ marginTop: 12, textAlign: 'center' }}>
        <Link
            href="/works"
            className="inline-flex items-center gap-2"
            style={{ 
              fontSize: 12, 
              letterSpacing: '.05em', 
              textDecoration: 'none',
              color: 'var(--tx1)',
              transition: 'all 0.2s ease'
            }}
        >
            <p className="hover:underline">View all projects</p>
            <span>↗</span>
        </Link>
    </div>
  )
}