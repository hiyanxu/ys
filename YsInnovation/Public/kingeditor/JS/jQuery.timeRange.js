﻿//这个时间控件与保存在SVN服务器上的控件不同，这个是经过修改为自定义函数之后的控件
$.extend({ aa: function () {
    //
    $('.timeRange').click(function () {
        $('#timeRange_div').remove();

        var hourOpts = '';
        for (i = 0; i < 24; i++) hourOpts += '<option>' + i + '</option>';
        var minuteOpts = '<option>00</option><option>01</option><option>02</option><option>03</option><option>04</option><option>05</option><option>06</option><option>07</option><option>08</option><option>09</option><option>10</option><option>11</option><option>12</option><option>13</option><option>14</option><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option><option>20</option><option>21</option><option>22</option><option>23</option><option>24</option><option>25</option><option>26</option><option>27</option><option>28</option><option>29</option><option>30</option><option>31</option><option>32</option><option>33</option><option>34</option><option>35</option><option>36</option><option>37</option><option>38</option><option>39</option><option>40</option><option>41</option><option>42</option><option>43</option><option>44</option><option>45</option><option>46</option><option>47</option><option>48</option><option>49</option><option>50</option><option>51</option><option>52</option><option>53</option><option>54</option><option>55</option><option>56</option><option>57</option><option>58</option><option>59</option>';

        var html = $('<div id="timeRange_div"><select id="timeRange_a">' + hourOpts +
			'</select>:<select id="timeRange_b">' + minuteOpts +
			'</select>-<select id="timeRange_c">' + hourOpts +
			'</select>:<select id="timeRange_d">' + minuteOpts +
			'</select><input type="button" value="确定" id="timeRange_btn" /></div>')
			.css({
			    "position": "absolute",
			    "z-index": "999",
			    "padding": "5px",
			    "border": "1px solid #AAA",
			    "background-color": "#FFF",
			    "box-shadow": "1px 1px 3px rgba(0,0,0,.4)"
			})
			.click(function () { return false });
        // 如果文本框有值
        var v = $(this).val();
        if (v) {
            v = v.split(/:|-/);
            html.find('#timeRange_a').val(v[0]);
            html.find('#timeRange_b').val(v[1]);
            html.find('#timeRange_c').val(v[2]);
            html.find('#timeRange_d').val(v[3]);
        }
        // 点击确定的时候
        var pObj = $(this);
        html.find('#timeRange_btn').click(function () {
            var str = html.find('#timeRange_a').val() + ':'
				+ html.find('#timeRange_b').val() + '-'
				+ html.find('#timeRange_c').val() + ':'
				+ html.find('#timeRange_d').val();
            pObj.val(str);
            $('#timeRange_div').remove();
        });

        $(this).after(html);
        return false;
    });
    //
    $(document).click(function () {
        $('#timeRange_div').remove();
    });
    //
}
});
$(function () {
    $(".timeRange").live("click", function () {
        $.aa();
    });
});