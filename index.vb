Option Explicit
Option Compare Text

Dim Showed As Integer
Dim Isdrag As Boolean
Dim ImporteDragStart As String
Dim Pf03Grq As New GrialQuery

Dim Arbol_Rst As Recordset

Dim ModuloCorreccion As String
Dim AyudaSobre As String

Dim CodParams As String

Dim Estructura_ff As New GrialQuery
Dim Id_Nivelclasi_Fuente, ID_NivelClasi_Of

Dim PorINsti_Qry As GrialQuery
Dim PorFuente_Qry As GrialQuery
Dim GRoupDelete

Private Enum TABS
    TAB_GLOBAL
    TAB_SELECT_PI
End Enum

Private Sub CallWithParams(ByVal ModuleName As String)
On Error GoTo ErrH

    Dim Pars As String, ParName As String, ParVal As String
    
    GrialCont.DocCall_Initialize
    
    Pars = CodParams
    While Len(Pars)
        ParVal = Extract(Pars)
        ParName = Extract(ParVal, "=")
        GrialCont.DocCall_AddParameter ParName, ParVal
        
    Wend
    
    GrialCont.DocCall_Execute ModuleName

Exit Sub

ErrH:
    MsgBox VBErrorText(), vbCritical

End Sub


Private Sub GrialCont_BottomButtonClick(ByVal GrialButtonCode As GrialApp.GrialButtons, Cancel As Integer, NewState As GrialApp.Operation_States)
On Error GoTo ErrH

Salida:
Exit Sub

' ------ Manejo de errores
ErrH:
    ' Le muestro el error al usuario
    MsgBox VBErrorText(), vbCritical
    Cancel = True ' Cancelo el evento
    ' Por default cancelo el evento, la pantalla permanecerá igual,
    ' y el usuario podrá reintentar la operación
     
    GoTo Salida

End Sub

Private Sub GrialCont_ButtonClick(ByVal GrialButtonCode As GrialApp.GrialButtons, Cancel As Integer, NewState As GrialApp.Operation_States)

On Error GoTo ErrH
    
    If GrialButtonCode = BUTTON_CONSULT Then
        Set PorINsti_Qry = New GrialQuery
        Set PorFuente_Qry = New GrialQuery
        
        If General_GFF.PreForm02_Rst!ARBINSTI_CODRECTOR.Value = 0 Then
                PorFuente_Qry.Init "Defined Query: Totales_Por_Fuente_Dfq;" & _
                    "ID_NIVELCLASI_FUENTE=" & Id_Nivelclasi_Fuente & _
                    ";ID_NIVELCLASI_OF=" & ID_NivelClasi_Of & _
                    ";ID_PERIODO=" & General_GFF.ID_PreForm01 & _
                    ";ID_RECTORA=NULL" & _
                    ";ID_ARBOLINSTI=" & General_GFF.ID_PreForm02
        Else
                PorFuente_Qry.Init "Defined Query: Totales_Por_Fuente_Dfq;" & _
                    "ID_NIVELCLASI_FUENTE=" & Id_Nivelclasi_Fuente & _
                    ";ID_NIVELCLASI_OF=" & ID_NivelClasi_Of & _
                    ";ID_PERIODO=" & General_GFF.ID_PreForm01 & _
                    ";ID_RECTORA=" & General_GFF.ID_PreForm02 & _
                    ";ID_ARBOLINSTI=NULL"
        End If
        
        PorINsti_Qry.Init "Defined Query: Totales_Por_Institucion_Dfq;" & _
            "ID_NIVELCLASI_FUENTE=" & Id_Nivelclasi_Fuente & _
            ";ID_NIVELCLASI_OF=" & ID_NivelClasi_Of & _
            ";ID_PERIODO=" & General_GFF.ID_PreForm01 & _
            ";RELA_RECTORA=" & General_GFF.ID_PreForm02
        
        GrialCont.LoadData PorFuente_Qry, PorINsti_Qry
        'Seteo la grilla por fuentes
        Porfuente_Sgx.Initialize GrialCont
        Porfuente_Sgx.ClearColumns
        Porfuente_Sgx.Bind PorFuente_Qry.Rst
        
        define_Grilla_por_Fuente
        
        'Seteo la grilla por Institucion
        PorInsti_Sgx.Initialize GrialCont
        PorInsti_Sgx.ClearColumns
        PorInsti_Sgx.Bind PorINsti_Qry.Rst
        
        define_Grilla_por_insti
        With GrialGridPrint1_ggp
            .Prepare_FromGridexObject PorFuente_Gri
            .ReportTitle = "Totales por Fuente de Financiamiento"
           .AdjustColumnsWidth ACW_ToDataAndCaptions
        End With

        With GrialGridPrint2_ggp
            .Prepare_FromGridexObject PorInsti_Gri
            .ReportTitle = "Totales por Fuente de Financiamiento"
             .AdjustColumnsWidth ACW_ToDataAndCaptions
        End With
       
    End If
    PorInsti_Gri.Groups.Add PorInsti_Gri.Columns("FUENTE_CODIGO").Index, jgexSortAscending
    PorInsti_Gri.Columns("FUENTE_CODIGO").Visible = False
    Generar_grupos PorInsti_Gri
    PorInsti_Gri.Row = 1
    
    'Si es una local disableo el tab por institucion
    TabVistas.TabEnabled(1) = General_GFF.EsRectora
    TabVistas.Tab = 0
Salida:
Exit Sub

' ------ Manejo de errores
ErrH:
    ' Le muestro el error al usuario
    MsgBox VBErrorText(), vbCritical
    
    Cancel = True ' Cancelo el evento
    ' Por default cancelo el evento, la pantalla permanecerá igual,
    ' y el usuario podrá reintentar la operación
    GoTo Salida

End Sub
Sub define_Grilla_por_insti()
Dim i
       For i = 1 To PorInsti_Sgx.Columns.Count
              PorInsti_Sgx.Columns(i).Visible = True
        Next i
        PorInsti_Sgx.Columns("FUENTE_TOPE").Visible = False
        PorInsti_Sgx.Columns("ARBINSTI_CODRECTOR").Visible = False
        PorInsti_Sgx.Columns("AGRUPADOR").Visible = False
        PorInsti_Sgx.Columns("Institucion_TOPE").Visible = False
        PorInsti_Sgx.Columns("Institucion_Descri").Header = "Institución"
        PorInsti_Sgx.Columns("FUENTE_Codigo").Header = "Fuente "
        PorInsti_Sgx.Columns("Of_Codigo").Header = "Organismo"
        PorInsti_Sgx.Columns("Tope").Header = "Tope"
        PorInsti_Sgx.Columns("Total_Ingresos").Header = "Ingresos"
        PorInsti_Sgx.Columns("Total_Egresos").Header = "Egresos"
        
        PorInsti_Gri.Columns("Tope").Format = "Currency"
        PorInsti_Gri.Columns("Tope").TextAlignment = jgexAlignRight
        PorInsti_Gri.Columns("Total_Ingresos").Format = "Currency"
        PorInsti_Gri.Columns("Total_Ingresos").TextAlignment = jgexAlignRight
        PorInsti_Gri.Columns("Total_Egresos").Format = "Currency"
        PorInsti_Gri.Columns("Total_Egresos").TextAlignment = jgexAlignRight
        
        PorInsti_Sgx.RefreshColumnDef
        PorInsti_Sgx.AdjustColumnsWidth
        PorInsti_Gri.Columns("Total_Egresos").Width = 1455
        PorInsti_Gri.Columns("Total_Ingresos").Width = 1455
        PorInsti_Gri.Columns("Tope").Width = 1455
        PorInsti_Gri.Columns("Of_Codigo").Width = 4800
End Sub
Sub define_Grilla_por_Fuente()
Dim i
        For i = 1 To Porfuente_Sgx.Columns.Count
              Porfuente_Sgx.Columns(i).Visible = True
        Next i
        Porfuente_Sgx.Columns("FUENTE_TOPE").Visible = False
        Porfuente_Sgx.Columns("ARBINSTI_CODRECTOR").Visible = False
        Porfuente_Sgx.Columns("AGRUPADOR").Visible = False
        Porfuente_Sgx.Columns("FUENTE_Codigo").Header = "Fuente "
        Porfuente_Sgx.Columns("Of_Codigo").Header = "Organismo"
        Porfuente_Sgx.Columns("Tope").Header = "Tope"
        Porfuente_Sgx.Columns("Total_Ingresos").Header = "Ingresos"
        Porfuente_Sgx.Columns("Total_Egresos").Header = "Egresos"
        
        PorFuente_Gri.Columns("Tope").Format = "Currency"
        PorFuente_Gri.Columns("Tope").TextAlignment = jgexAlignRight
        PorFuente_Gri.Columns("Total_Ingresos").Format = "Currency"
        PorFuente_Gri.Columns("Total_Ingresos").TextAlignment = jgexAlignRight
        PorFuente_Gri.Columns("Total_Egresos").Format = "Currency"
        PorFuente_Gri.Columns("Total_Egresos").TextAlignment = jgexAlignRight
        
        Porfuente_Sgx.RefreshColumnDef
        Porfuente_Sgx.AdjustColumnsWidth
        PorFuente_Gri.Columns("Total_Egresos").Width = 1455
        PorFuente_Gri.Columns("Total_Ingresos").Width = 1455
        PorFuente_Gri.Columns("Tope").Width = 1455
        
End Sub

Private Sub GrialCont_ContainerFrmShow(ByVal NewState As GrialApp.Operation_States)
PorInsti_Gri.SortKeys.Clear
PorInsti_Gri.SortKeys.Add PorInsti_Gri.Columns("FUENTE_Codigo").Index, jgexSortAscending
PorFuente_Gri.SortKeys.Clear
PorFuente_Gri.SortKeys.Add PorFuente_Gri.Columns("FUENTE_Codigo").Index, jgexSortAscending

End Sub

Private Sub GrialGridPrint1_ggp_PreGridPrintData()
    With GrialGridPrint1_ggp
        .WtTitleData "Sector", General_GFF.PreForm02_Rst!Preform18_descri.Value
        .WtTitleData "Institución", General_GFF.PreForm02_CodigoyDescri
        .WtTitleData "Período", General_GFF.PreForm01_Descri
        .Printer_Advance 1.5
    End With

End Sub

Private Sub GrialGridPrint2_ggp_PreGridPrintData()
    With GrialGridPrint2_ggp
        .WtTitleData "Sector", NVLStr(General_GFF.PreForm02_Rst!Preform18_descri.Value)
        .WtTitleData "Período", General_GFF.PreForm01_Descri
        .Printer_Advance 1.5
    End With
End Sub

Private Sub PorFuente_Gri_AfterGroupChange()
        Generar_grupos PorFuente_Gri
End Sub

Private Sub PorFuente_Gri_BeforeColMove(ByVal Column As GridEX16.JSColumn, ByVal NewPosition As Integer, ByVal Cancel As GridEX16.JSRetBoolean)
        Cancel = True
End Sub

Private Sub PorFuente_Gri_BeforeGroupChange(ByVal Group As GridEX16.JSGroup, ByVal ChangeOperation As GridEX16.jgexGroupChange, ByVal GroupPosition As Integer, ByVal Cancel As GridEX16.JSRetBoolean)
    Select Case ChangeOperation
           Case jgexGroupInsert
                         
                   If PorFuente_Gri.Groups.Count > 0 Or _
                     ((PorFuente_Gri.Columns(Group.ColIndex).DataField <> "INSTITUCION_DESCRI") And _
                     (PorFuente_Gri.Columns(Group.ColIndex).DataField <> "FUENTE_CODIGO") And _
                     (PorFuente_Gri.Columns(Group.ColIndex).DataField <> "OF_CODIGO")) Then
                      Cancel = True
                      Exit Sub
                   End If
                   
                   PorFuente_Gri.Columns(Group.ColIndex).Visible = False
                   
           Case jgexGroupDelete
                   
                   PorFuente_Gri.Columns(Group.ColIndex).Visible = True
                   GRoupDelete = Group.ColIndex * (-1)

    End Select

End Sub

Private Sub PorFuente_Gri_MouseDown(Button As Integer, Shift As Integer, X As Single, Y As Single)
        P_MouseDown X, Y, PorFuente_Gri
End Sub

Private Sub PorFuente_Gri_MouseMove(Button As Integer, Shift As Integer, X As Single, Y As Single)

P_MouseMove X, Y, PorFuente_Gri

End Sub

Private Sub PorFuente_Gri_MouseUp(Button As Integer, Shift As Integer, X As Single, Y As Single)
    Isdrag = False
    DragAndDrop_Frm.Visible = False
End Sub

Private Sub PorInsti_Gri_AfterGroupChange()
        Generar_grupos PorInsti_Gri
End Sub

Private Sub PorInsti_Gri_BeforeColMove(ByVal Column As GridEX16.JSColumn, ByVal NewPosition As Integer, ByVal Cancel As GridEX16.JSRetBoolean)
        Cancel = True
End Sub

Private Sub PorInsti_Gri_BeforeGroupChange(ByVal Group As GridEX16.JSGroup, ByVal ChangeOperation As GridEX16.jgexGroupChange, ByVal GroupPosition As Integer, ByVal Cancel As GridEX16.JSRetBoolean)

    Select Case ChangeOperation
           Case jgexGroupInsert
                         
                   If PorInsti_Gri.Groups.Count > 0 Or _
                     ((PorInsti_Gri.Columns(Group.ColIndex).DataField <> "INSTITUCION_DESCRI") And _
                     (PorInsti_Gri.Columns(Group.ColIndex).DataField <> "FUENTE_CODIGO") And _
                     (PorInsti_Gri.Columns(Group.ColIndex).DataField <> "OF_CODIGO")) Then
                      Cancel = True
                      Exit Sub
                   End If
                   
                   PorInsti_Gri.Columns(Group.ColIndex).Visible = False
                   
           Case jgexGroupDelete
                   
                   PorInsti_Gri.Columns(Group.ColIndex).Visible = True
                   GRoupDelete = Group.ColIndex * (-1)

    End Select
    
End Sub
Sub Borro_deMas(PorInsti_Gri As Object)
    PorInsti_Gri.AllowDelete = True
    
    Do While True
        PorInsti_Gri.MoveLast
        If PorInsti_Gri.Value(PorInsti_Gri.Columns("AGRUPADOR").Index) > "1" Then
           PorInsti_Gri.Delete

        Else
           Exit Do
        End If
        
    Loop
    
    PorInsti_Gri.ADORecordset.UpdateBatch
    PorInsti_Gri.SortKeys.Remove 1
    PorInsti_Gri.FmtConditions.Remove 1
    PorInsti_Gri.RefreshSort
    PorInsti_Gri.RefreshGroups
    
    PorInsti_Gri.AllowDelete = False
End Sub
Sub Generar_grupos(PorInsti_Gri As Object)
   If PorInsti_Gri.Groups.Count <> 0 Then
      Dim i, j, t
      Dim FindStr As String
      For i = 1 To PorInsti_Gri.Groups.Count
              
              With PorInsti_Gri.ADORecordset
                      
                      For j = 1 To PorInsti_Gri.RowCount
                            PorInsti_Gri.Row = j
                             If PorInsti_Gri.GroupRowLevel(j) = 0 And PorInsti_Gri.Value(PorInsti_Gri.Columns("Fuente_TOPE").Index) > 0 Then
                                 FindStr = "( " & PorInsti_Gri.Columns(PorInsti_Gri.Groups(i).ColIndex).DataField & _
                                               " = '" & PorInsti_Gri.Value((PorInsti_Gri.Groups(i).ColIndex)) & "' )  AND ( " & _
                                               "AGRUPADOR = " & PorInsti_Gri.Groups(i).ColIndex & " )"
                                 
                                 
                                     .Filter = FindStr
                                 If .EOF Then
                                      .AddNew
                                      .Fields("AGRUPADOR").Value = PorInsti_Gri.Groups(i).ColIndex
                                      For t = 1 To PorInsti_Gri.Groups.Count
                                               .Fields(PorInsti_Gri.Columns(PorInsti_Gri.Groups(t).ColIndex).DataField).Value = _
                                                         PorInsti_Gri.Value((PorInsti_Gri.Groups(t).ColIndex))
                                       Next t
                                 End If
                                 
                                 If NVL(PorInsti_Gri.Value(PorInsti_Gri.Columns("ARBINSTI_CODRECTOR").Index), "0") = "0" Or _
                                    PorInsti_Gri.Columns(PorInsti_Gri.Groups(i).ColIndex).DataField = "INSTITUCION_DESCRI" Then
                                    .Fields("TOPE").Value = NVL(.Fields("TOPE").Value, 0) + NVL(PorInsti_Gri.Value(PorInsti_Gri.Columns("TOPE").Index), 0)
                                 End If
                                 .Fields("TOTAL_INGRESOS").Value = NVL(.Fields("TOTAL_INGRESOS").Value, 0) + NVL(PorInsti_Gri.Value(PorInsti_Gri.Columns("TOTAL_INGRESOS").Index), 0)
                                 .Fields("TOTAL_EGRESOS").Value = NVL(.Fields("TOTAL_EGRESOS").Value, 0) + NVL(PorInsti_Gri.Value(PorInsti_Gri.Columns("TOTAL_EGRESOS").Index), 0)
                                 .Filter = adFilterNone
                           End If
                                    
                      Next j
              End With
              PorInsti_Gri.SortKeys.Add PorInsti_Gri.Columns("AGRUPADOR").Index, jgexSortAscending, i
              PorInsti_Gri.Groups(i).SortOrder = jgexSortAscending
      Next i
      
      PorInsti_Gri.FmtConditions.Add PorInsti_Gri.Columns("AGRUPADOR").Index, jgexGreaterThan, "0"
      PorInsti_Gri.FmtConditions(1).FormatStyle.ForeColor = QBColor(1)
      PorInsti_Gri.SearchNewRecords
      PorInsti_Gri.RefreshGroups
      PorInsti_Gri.ADORecordset.Filter = adFilterNone
      PorInsti_Sgx.AdjustColumnsWidth
      PorInsti_Gri.Columns("Of_Codigo").Width = 4800
      PorInsti_Gri.MoveFirst
  Else
      Borro_deMas PorInsti_Gri
  End If
End Sub

Private Sub PorInsti_Gri_ColumnHeaderClick(ByVal Column As GridEX16.JSColumn)
        PorInsti_Sgx.ColumnHeaderClick PorInsti_Gri, Column
End Sub

Private Sub PorFuente_Gri_ColumnHeaderClick(ByVal Column As GridEX16.JSColumn)
        Porfuente_Sgx.ColumnHeaderClick PorFuente_Gri, Column
End Sub

Private Sub PorInsti_Gri_MouseDown(Button As Integer, Shift As Integer, X As Single, Y As Single)
    P_MouseDown X, Y, PorInsti_Gri
End Sub

Sub P_MouseDown(X As Single, Y As Single, PorInsti_Gri As Object)
   If PorInsti_Gri.HitTest(X, Y) = jgexHTCell Then
      On Error GoTo ef
      If IsNumeric(NVL(PorInsti_Gri.Value(PorInsti_Gri.ColFromPoint(X, Y).ColPosition), 0)) Then
        Isdrag = True
        PorInsti_Gri.Row = PorInsti_Gri.RowFromPoint(X, Y)
        ImporteDragStart = FormatCurrency(NVL(PorInsti_Gri.Value(PorInsti_Gri.ColFromPoint(X, Y).ColPosition), 0))
      End If
   End If
Exit Sub
ef:
 Exit Sub
End Sub

Private Sub PorInsti_Gri_MouseMove(Button As Integer, Shift As Integer, X As Single, Y As Single)
    P_MouseMove X, Y, PorInsti_Gri
End Sub

Private Sub AdjLabel(Lbl As Label)
    Lbl.Left = DragAndDrop_Frm.Width - 120 - Lbl.Width
End Sub

Sub P_MouseMove(X As Single, Y As Single, PorInsti_Gri As Object)
Dim lX As Long, ly As Long
If Isdrag Then
    DragAndDrop_Frm.Top = Y - 120
    DragAndDrop_Frm.Left = X - 360
    Label1.Caption = ImporteDragStart
    lX = X
    ly = Y
    If PorInsti_Gri.HitTest(lX, ly) = jgexHTCell Then
        PorInsti_Gri.Row = PorInsti_Gri.RowFromPoint(lX, ly)
        Dim OverVal As String
        OverVal = NVLStr(PorInsti_Gri.Value(PorInsti_Gri.ColFromPoint(lX, ly).ColPosition))
        If OverVal <> "" Then
            LabelOver = FormatCurrency(ValCur(OverVal))
            Label2.Caption = FormatCurrency(ImporteDragStart - ValCur(OverVal))
        Else
            LabelOver = ""
            Label2.Caption = ""
        End If
    Else
        Label2.Caption = ""
    End If
    DragAndDrop_Frm.Width = 240 + Max(Max(Label1.Width, Label2.Width), LabelOver.Width)
    AdjLabel Label1: AdjLabel Label2: AdjLabel LabelOver
    DragAndDrop_Frm.Visible = True
    DragAndDrop_Frm.ZOrder
End If

End Sub

Private Sub PorInsti_Gri_MouseUp(Button As Integer, Shift As Integer, X As Single, Y As Single)
    Isdrag = False
    DragAndDrop_Frm.Visible = False
End Sub

Private Sub UserDocument_Hide()
    GrialCont.Finalize
End Sub

Private Sub UserDocument_Show()
On Error GoTo ErrH
        
    ' Inicializo APl ppal
    With GrialCont
        .Initialize UserDocument.Name, Parent.LocationURL
        .CheckVersion App
        .TopBar_AllButtonsVisible False
        .ButtonStd_Visible BUTTON_CONSULT, True
    End With
    
    Estructura_ff.Init "Select * From Pre_Form_04w " & _
                                "Where  Clasifi_Accion = '{}ff' Order By Nivelc_Orden"

    GrialCont.LoadData Estructura_ff
    
    'Busco los niveles de fuentes y organismos
    With Estructura_ff.Rst
           .MoveFirst
           Id_Nivelclasi_Fuente = .Fields("ID_NIVELCLASI").Value
           .MoveLast
           ID_NivelClasi_Of = .Fields("ID_NIVELCLASI").Value
    End With
    
    General_GFF.FirstSelection
        
    Showed = True
    UserDocument_Resize
    
Exit Sub
 
ErrH:
    MsgBox VBErrorText()
 
End Sub

Private Sub UserDocument_Resize()
If Showed Then
    GrialCont.Center ViewportWidth, General_GFF
End If
End Sub


