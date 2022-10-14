REM  *****  BASIC  *****

Sub Main
	clearEverything()
	import_logs()
End Sub

Sub clearEverything
	oCtrl = ThisComponent.CurrentController
	oCtrl.Select(oCtrl.ActiveSheet.GetCellRangeByName("A1:ZZ999"))
	For i = 0 To 9
	  Thiscomponent.CurrentSelection.ClearContents(2 ^ i)
	Next
End Sub

Sub import_logs()
    Dim i, strFile
    GlobalScope.BasicLibraries.loadLibrary("Tools")
    path=DirectoryNameoutofPath(ThisComponent.getURL(), GetPathSeparator()) + GetPathSeparator()
	strFile = Dir(path,0)
    i = 0
    while strFile <> ""
        my_cell = ThisComponent.Sheets(0).getCellbyPosition(i,0)
        If (strFile like "*.csv") Then 
        	my_cell.String = strFile
        	ThisComponent.Sheets(0).getCellbyPosition(i+1,0).String = "Free Places"
        	import_csv(path+strFile, i)
        	i = i + 2        	
        Endif
        strFile = Dir ' returns next entry        
    wend
End Sub

Sub import_csv(strFile as String, column as Long)
Dim opt(1) As New com.sun.star.beans.PropertyValue
#Dim Dummy() 'An (empty) array of PropertyValues
    
    opt(0).Name = "FilterName"
    opt(0).Value = "Text - txt - csv (StarCalc)"
    opt(1).Name = "FilterOptions"
    opt(1).Value = "44,34,0,1,1/2/2/1/"
    
    doc = ThisComponent
    cell = doc.Sheets.getByIndex(0).getCellRangeByName("A1")
	target = next_cell(cell, column)
	
	csv = StarDesktop.loadComponentFromURL(strFile, "_blank", 0, opt())
	sheet = csv.Sheets.getByIndex(0)
	cell = sheet.getCellRangeByName("A1")
	cursor = sheet.createCursorByRange(cell)
	cursor.collapseToCurrentRegion()
	ra = cursor.RangeAddress

	data = sheet.getCellRangeByPosition(ra.StartColumn, ra.StartRow, ra.EndColumn, ra.EndRow).DataArray
	copy_to(target, data)
	csv.close(True)

End Sub


Function copy_to(cell, data)
    ra = cell.RangeAddress
    s = cell.SpreadSheet
    cols = ra.EndColumn + UBound(data(0))
    rows = ra.EndRow + Ubound(data)
    range = s.getCellRangeByPosition(ra.StartColumn, ra.StartRow, cols, rows)
    range.DataArray = data
End Function


Function next_cell(cell, column)
    cursor = cell.SpreadSheet.createCursorByRange(cell)
    row = cursor.RangeAddress.EndRow
    next_cell = cell.SpreadSheet.getCellByPosition(column, row + 1)
End Function


Function ColumnLetter(ColumnNumber As Long) As String
    Dim n As Long
    Dim c As Byte
    Dim s As String

    n = ColumnNumber
    Do
        c = ((n - 1) Mod 26)
        s = Chr(c + 65) & s
        n = (n - c) \ 26
    Loop While n > 0
    ColumnLetter = s
End Function

Sub Test()
	GlobalScope.BasicLibraries.loadLibrary("Tools")
	path=DirectoryNameoutofPath(ThisComponent.getURL(),"/")
	msgbox GetPathSeparator()
End Sub
