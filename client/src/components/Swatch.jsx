import './Swatch.scss'

export default function Swatch({ title, color }) {
  return <div className='swatch'>
    <div className='circle' style={{ backgroundColor: color }} />
    {title}
  </div>
}