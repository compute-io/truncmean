TODO
====

1. Slight (possible) optimization when interpolating.
	-	Currently, compute mean with greatest support first and then remove high and low elements.
	-	This adds an additional 6 operations, including 2 divisions.
	-	If possible, could switch the order, such that smaller support first, so long as does not require additional boolean checks, too much duplicated code, etc.
	-	The issue resides in wanting to early exit if `w2` exceeds `0.5`, obviating the need for interpolation.
2. 

