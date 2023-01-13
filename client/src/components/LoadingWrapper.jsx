export default function LoadingWrapper({ fetchState: { loading, error }, children }) {
  if (loading) return 'Loading'
  if (error) return (
    <>
      <h1>An Error Occurred</h1>
      <p>{error?.message || error}</p>
      <p>Please reload the page or contact support.</p>
    </>
  )
  return (
    <>{children}</>
  )
}